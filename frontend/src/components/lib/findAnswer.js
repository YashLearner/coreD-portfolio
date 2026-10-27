/**
 * Question matching for the CoreD assistant.
 *
 * A deterministic, explainable FAQ matcher. It never calls an external service
 * and never generates text: every reply is an entry from KnowledgeBase.js, or
 * null when nothing matches reliably (the caller then shows the fallback).
 *
 * How it works
 *   1. Text is lowercased, stripped of punctuation, and split into words.
 *   2. Filler words are dropped. Synonyms and plurals collapse to one token
 *      (cost, pricing, fee, kimat -> "price"; agents -> "agent").
 *   3. Each token is weighted by rarity across the knowledge base, so generic
 *      words such as "crm" count for little and distinctive ones such as
 *      "basic" or "price" count for a lot. Words the knowledge base has never
 *      seen count the most, which stops half-matches from looking confident.
 *   4. The query is compared with every question and keyword of every entry.
 *      The best entry wins only if it clears a confidence threshold and is not
 *      a near-tie with a different entry.
 */

import { knowledgeBase } from "../../data/KnowledgeBase.js";

export const MAX_QUESTION_LENGTH = 500;

const MIN_CONFIDENCE = 0.55;
const STRONG_CONFIDENCE = 0.75;
const AMBIGUITY_MARGIN = 0.06;
const KEYWORD_PENALTY = 0.9;
const MAX_QUERY_TOKENS = 40;
const GENERIC_WORD_SHARE = 0.4;
const MIN_FUZZY_LENGTH = 5;
const CONTACT_ACTION = "contact";

/* -------------------------------------------------------------------------- */
/* Vocabulary                                                                 */
/* -------------------------------------------------------------------------- */

const STOPWORDS = new Set(
  `a an the is are was were be been am do does did can could would should will shall may might
   you your yours we our ours us i me my mine it its this that these those of for to in on at by
   with from as and or but if so about tell please pls kindly what whats which who whom how hows
   when where why there any some get got let know like also just really very all hai hain ho hota
   hoti hote kya ka ki ke ko se par pe aur ya kaise kaun kitna kitne kitni kab kyun kahan karta
   karte karti kar karu karun karna sakte sakta sakti mujhe mere meri mera humare aap aapka aapki
   aapke apka apki apke batao batayiye bataiye me mein hum tum thats dont doesnt isnt cant wont
   im ive id youre lets have has had`.split(/\s+/),
);

const GREETING_TOKENS = new Set(["hi", "hello", "hey", "namaste"]);

// Every word listed on the right collapses to the token on the left. Plurals are
// handled separately, so only the singular form is needed here.
const SYNONYM_GROUPS = {
  price: [
    "pricing", "cost", "costing", "charge", "fee", "rate", "quote", "quotation", "much",
    "expensive", "cheap", "cheaper", "cheapest", "afford", "affordable", "discount", "budget",
    "kimat", "keemat", "daam", "kharcha", "paisa", "rupee", "inr",
  ],
  plan: ["package", "tier", "option", "edition", "subscription"],
  agent: ["agentic"],
  service: ["offer", "offering", "provide", "solution", "product"],
  custom: [
    "customise", "customize", "customised", "customized", "customisation", "customization",
    "customisable", "customizable", "tailor", "tailored", "tailoring", "bespoke",
    "personalise", "personalize", "personalised", "personalized", "specialised", "specialized",
  ],
  build: ["make", "create", "develop", "development", "design", "built", "building", "construct"],
  automation: ["automate", "automated", "automating", "automatic", "automatically"],
  workflow: ["process", "procedure"],
  difference: ["differ", "different", "compare", "comparison", "versus", "vs", "contrast", "better"],
  include: ["contain", "cover", "feature", "come"],
  count: ["many", "number", "quantity"],
  contact: [
    "enquire", "inquire", "enquiry", "inquiry", "reach", "talk", "speak", "discuss",
    "book", "call", "meeting",
  ],
  requirement: ["require", "required"],
  help: ["advantage", "benefit", "useful", "improve", "improvement", "helpful"],
  guarantee: ["assure", "assurance", "promise", "warranty", "ensure", "guaranteed"],
  result: ["outcome", "roi", "return"],
  integration: ["integrate", "sync", "plugin"],
  security: ["secure", "safe", "safety", "privacy"],
  compliance: ["certification", "certified", "compliance", "gdpr", "iso"],
  timeline: ["time", "duration", "long", "deliver", "delivery", "turnaround", "deadline"],
  trial: ["free", "demo", "sample"],
  user: ["seat"],
  limit: ["cap", "quota"],
  start: ["begin", "onboard", "onboarding"],
  one: ["1", "single", "solo"],
  two: ["2"],
  three: ["3"],
  multi: ["multiple", "several"],
  cored: [],
  crm: [],
};

const SYNONYMS = new Map(
  Object.entries(SYNONYM_GROUPS).flatMap(([token, words]) => words.map((word) => [word, token])),
);

/* -------------------------------------------------------------------------- */
/* Text helpers                                                               */
/* -------------------------------------------------------------------------- */

function normalizeText(value) {
  return String(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/\bwhich ones?\b/g, "which")
    .replace(/\bcustomer relationship management\b/g, "crm")
    .replace(/\bartificial intelligence\b/g, "ai")
    .replace(/\bcore[\s-]+d\b/g, "cored")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function singularize(word) {
  if (word.length <= 3) return word;
  if (word.endsWith("ies") && word.length > 4) return `${word.slice(0, -3)}y`;
  if (word.endsWith("sses")) return word.slice(0, -2);
  if (/(ss|us|is)$/.test(word)) return word;
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function canonicalize(word) {
  const stem = singularize(word);
  return SYNONYMS.get(word) ?? SYNONYMS.get(stem) ?? stem;
}

// True when a and b differ by at most one insertion, deletion, substitution or
// adjacent swap. Used only to forgive small typos in long words.
function isWithinOneEdit(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;

  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;

  if (a.length === b.length) {
    if (a.slice(i + 1) === b.slice(i + 1)) return true;
    return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
  }

  const [longer, shorter] = a.length > b.length ? [a, b] : [b, a];
  return longer.slice(i + 1) === shorter.slice(i);
}

/* -------------------------------------------------------------------------- */
/* Input validation                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Cleans a visitor's message and checks it is safe to process.
 * Returns { ok: true, value } or { ok: false, reason: "invalid" | "empty" | "too-long" }.
 */
export function validateQuestion(input) {
  if (typeof input !== "string") return { ok: false, reason: "invalid" };

  const value = input.replace(/\p{Cc}/gu, " ").replace(/\s+/g, " ").trim();

  if (!value) return { ok: false, reason: "empty" };
  if (value.length > MAX_QUESTION_LENGTH) return { ok: false, reason: "too-long" };

  return { ok: true, value };
}

/* -------------------------------------------------------------------------- */
/* Knowledge base checks                                                      */
/* -------------------------------------------------------------------------- */

const isText = (value) => typeof value === "string" && value.trim().length > 0;

/** Returns a list of human-readable problems. An empty list means the data is sound. */
export function validateKnowledgeBase(entries) {
  if (!Array.isArray(entries)) return ["The knowledge base must be an array."];

  const issues = [];
  const seenIds = new Set();
  const seenQuestions = new Map();

  entries.forEach((entry, index) => {
    const label = `Entry ${index}`;

    if (!entry || typeof entry !== "object") {
      issues.push(`${label} is not an object.`);
      return;
    }

    if (!isText(entry.id)) {
      issues.push(`${label} has no id.`);
    } else if (seenIds.has(entry.id)) {
      issues.push(`${label} repeats the id "${entry.id}".`);
    } else {
      seenIds.add(entry.id);
    }

    const name = isText(entry.id) ? `"${entry.id}"` : label;

    if (!isText(entry.answer)) issues.push(`${name} has no answer text.`);
    if (entry.action !== undefined && entry.action !== CONTACT_ACTION) {
      issues.push(`${name} uses the unknown action "${entry.action}".`);
    }
    if (!Array.isArray(entry.questions) || !entry.questions.some(isText)) {
      issues.push(`${name} needs at least one question.`);
      return;
    }

    entry.questions.filter(isText).forEach((question) => {
      const key = normalizeText(question);
      const owner = seenQuestions.get(key);
      if (owner !== undefined && owner !== entry.id) {
        issues.push(`${name} repeats a question already used by "${owner}": "${question}".`);
      } else {
        seenQuestions.set(key, entry.id);
      }
    });
  });

  return issues;
}

/* -------------------------------------------------------------------------- */
/* Engine                                                                     */
/* -------------------------------------------------------------------------- */

function usableEntries(entries) {
  if (!Array.isArray(entries)) return [];

  const seenIds = new Set();
  const result = [];

  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    if (!isText(entry.id) || !isText(entry.answer)) continue;
    if (seenIds.has(entry.id)) continue;

    const questions = Array.isArray(entry.questions) ? entry.questions.filter(isText) : [];
    if (questions.length === 0) continue;

    seenIds.add(entry.id);
    result.push({
      id: entry.id,
      answer: entry.answer,
      action: entry.action === CONTACT_ACTION ? CONTACT_ACTION : undefined,
      questions,
      keywords: Array.isArray(entry.keywords) ? entry.keywords.filter(isText) : [],
    });
  }

  return result;
}

function toResult(entry) {
  return { id: entry.id, content: entry.answer, action: entry.action };
}

/**
 * Builds a matcher over a list of FAQ entries. Malformed or duplicate entries
 * are skipped instead of throwing. `issues` lists what was wrong.
 */
export function createAnswerEngine(entries) {
  const issues = validateKnowledgeBase(entries);
  const faqs = usableEntries(entries);
  const byId = new Map(faqs.map((faq) => [faq.id, faq]));

  // Index every question and keyword once.
  const knownWords = new Set(SYNONYMS.keys());
  const documentFrequency = new Map();

  const indexed = faqs.map((faq) => {
    const entryTokens = new Set();
    const variants = [
      ...faq.questions.map((text) => ({ text, penalty: 1 })),
      ...faq.keywords.map((text) => ({ text, penalty: KEYWORD_PENALTY })),
    ].map(({ text, penalty }) => {
      const normalized = normalizeText(text);
      normalized.split(" ").forEach((word) => knownWords.add(word));
      const tokens = new Set(normalized.split(" ").filter((w) => w && !STOPWORDS.has(w)).map(canonicalize));
      tokens.forEach((token) => entryTokens.add(token));
      return { normalized, tokens, penalty };
    });

    entryTokens.forEach((token) => {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    });

    return { faq, variants };
  });

  const total = Math.max(faqs.length, 1);
  const idf = new Map();
  documentFrequency.forEach((count, token) => {
    idf.set(token, Math.log(1 + (total - count + 0.5) / (count + 0.5)));
  });
  const unseenWeight = Math.log(1 + total);
  const weightOf = (token) => idf.get(token) ?? unseenWeight;
  // A message that is just one word appearing all over the knowledge base ("ai",
  // "agent") says too little to pick an answer, so it may only match a question
  // written exactly like it. Full questions such as "what is crm" are unaffected.
  const minSingleWordWeight = unseenWeight * GENERIC_WORD_SHARE;

  const vocabulary = [...knownWords].filter((word) => word.length >= MIN_FUZZY_LENGTH);

  function tokenizeQuery(normalized) {
    const tokens = [];

    for (const word of normalized.split(" ")) {
      if (!word || STOPWORDS.has(word)) continue;

      let candidate = word;
      if (
        word.length >= MIN_FUZZY_LENGTH &&
        !knownWords.has(word) &&
        !knownWords.has(singularize(word))
      ) {
        const matches = vocabulary.filter((known) => isWithinOneEdit(word, known));
        if (matches.length === 1) [candidate] = matches;
      }

      const token = canonicalize(candidate);
      if (!STOPWORDS.has(token)) tokens.push(token);
    }

    const unique = [...new Set(tokens)].slice(0, MAX_QUERY_TOKENS);
    const informative = unique.filter((token) => !GREETING_TOKENS.has(token));
    return informative.length > 0 ? informative : unique;
  }

  function similarity(queryTokens, variantTokens) {
    let shared = 0;
    let queryWeight = 0;
    let variantWeight = 0;

    queryTokens.forEach((token) => {
      const weight = weightOf(token);
      queryWeight += weight;
      if (variantTokens.has(token)) shared += weight;
    });
    variantTokens.forEach((token) => {
      variantWeight += weightOf(token);
    });

    if (shared === 0) return 0;

    const dice = (2 * shared) / (queryWeight + variantWeight);
    const containment = shared / queryWeight;
    return 0.65 * dice + 0.35 * containment;
  }

  function findAnswer(input) {
    const checked = validateQuestion(input);
    if (!checked.ok || indexed.length === 0) return null;

    const normalized = normalizeText(checked.value);
    const queryTokens = tokenizeQuery(normalized);
    const isSingleWord = !normalized.includes(" ");
    const isTooGeneric =
      isSingleWord && queryTokens.length === 1 && weightOf(queryTokens[0]) < minSingleWordWeight;

    const ranked = indexed
      .map(({ faq, variants }) => {
        let score = 0;
        for (const variant of variants) {
          if (variant.penalty === 1 && variant.normalized === normalized) {
            score = 1;
            break;
          }
          if (queryTokens.length > 0 && !isTooGeneric) {
            score = Math.max(score, similarity(queryTokens, variant.tokens) * variant.penalty);
          }
        }
        return { faq, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    const [best, runnerUp] = ranked;
    if (!best || best.score < MIN_CONFIDENCE) return null;

    const isNearTie = runnerUp && best.score - runnerUp.score < AMBIGUITY_MARGIN;
    if (best.score < STRONG_CONFIDENCE && isNearTie) return null;

    return toResult(best.faq);
  }

  function findAnswerById(id) {
    if (typeof id !== "string") return null;
    const faq = byId.get(id);
    return faq ? toResult(faq) : null;
  }

  return { findAnswer, findAnswerById, issues };
}

/* -------------------------------------------------------------------------- */
/* Default engine                                                             */
/* -------------------------------------------------------------------------- */

const defaultEngine = createAnswerEngine(knowledgeBase);

export const findAnswer = defaultEngine.findAnswer;
export const findAnswerById = defaultEngine.findAnswerById;

/**
 * Resolves a request from the chat window. A known FAQ id (from a suggested
 * question) wins; otherwise the typed text is matched. Returns null if neither
 * works, so the caller can show its fallback.
 */
export function resolveAnswer(request) {
  if (!request || typeof request !== "object") return null;
  return findAnswerById(request.faqId) ?? findAnswer(request.question);
}

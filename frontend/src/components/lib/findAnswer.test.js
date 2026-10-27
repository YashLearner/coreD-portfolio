import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { assistantCopy, contactChannel, knowledgeBase } from "../../data/KnowledgeBase.js";
import {
  MAX_QUESTION_LENGTH,
  createAnswerEngine,
  findAnswer,
  findAnswerById,
  resolveAnswer,
  validateKnowledgeBase,
  validateQuestion,
} from "./findAnswer.js";

const idOf = (question) => findAnswer(question)?.id ?? null;

// Every string value (not object keys) found anywhere inside a structure.
function collectStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}
const answerOf = (id) => knowledgeBase.find((entry) => entry.id === id).answer;

/* -------------------------------------------------------------------------- */
/* Knowledge base                                                             */
/* -------------------------------------------------------------------------- */

describe("knowledge base", () => {
  it("passes its own validation with no issues", () => {
    assert.deepEqual(validateKnowledgeBase(knowledgeBase), []);
  });

  it("uses unique kebab-case ids", () => {
    const ids = knowledgeBase.map((entry) => entry.id);
    assert.equal(new Set(ids).size, ids.length);
    ids.forEach((id) => assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("points every suggested question at a real entry", () => {
    assert.ok(assistantCopy.suggestions.length > 0);
    assistantCopy.suggestions.forEach(({ faqId, label }) => {
      assert.ok(findAnswerById(faqId), `unknown faqId ${faqId}`);
      assert.ok(label.trim().length > 0);
    });
  });

  it("only uses the supported action and a safe in-page contact link", () => {
    knowledgeBase.forEach((entry) => {
      assert.ok(entry.action === undefined || entry.action === "contact", entry.id);
    });
    assert.equal(assistantCopy.fallback.action, "contact");
    assert.match(contactChannel.href, /^#[A-Za-z][\w-]*$/);
  });

  it("contains no old portfolio content", () => {
    const text = collectStrings([knowledgeBase, assistantCopy]).join("\n").toLowerCase();
    for (const word of ["krishanu", "coredhristi", "kaundilya", "vapt", "ceh", "indore", "linkedin", "github"]) {
      assert.doesNotMatch(text, new RegExp(`\\b${word}\\b`), `leftover portfolio term: ${word}`);
    }
  });

  it("invents no prices, metrics, links, emails or markup", () => {
    const answers = [...knowledgeBase.map((entry) => entry.answer), assistantCopy.fallback.content, assistantCopy.welcome];
    answers.forEach((rawAnswer) => {
      // "Adsmark01" is a real client name from the case studies, not a figure.
      const answer = rawAnswer.replaceAll("Adsmark01", "Adsmark");
      assert.doesNotMatch(answer, /\d/, `digit in: ${answer.slice(0, 40)}`);
      assert.doesNotMatch(answer, /[$\u20B9\u20AC\u00A3%]/);
      assert.doesNotMatch(answer, /https?:|www\.|@/i);
      assert.doesNotMatch(answer, /[<>]/);
    });
  });

  it("states the plan structure consistently", () => {
    assert.match(answerOf("basic-plan"), /one AI agent/);
    assert.match(answerOf("basic-agent-count"), /one AI agent/);
    assert.match(answerOf("standard-plan"), /three AI agents/);
    assert.match(answerOf("standard-agent-count"), /three AI agents/);
    assert.match(answerOf("plans-overview"), /Basic Plan: a CRM solution with one AI agent/);
    assert.match(answerOf("plans-overview"), /Standard Plan: a CRM solution with three AI agents/);
    assert.match(answerOf("basic-vs-standard"), /one AI agent[\s\S]*three AI agents/);

    // The Basic entries must never claim three agents, and Standard never one.
    assert.doesNotMatch(answerOf("basic-plan"), /Basic[^.]*three AI agents/);
    assert.doesNotMatch(answerOf("standard-plan"), /Standard[^.]*one AI agent/);
  });

  it("says pricing is unconfirmed instead of giving a number", () => {
    assert.match(answerOf("pricing"), /don't have verified pricing/);
    assert.match(answerOf("pricing"), /confirmed with CoreD/);
  });
});

/* -------------------------------------------------------------------------- */
/* Realistic customer questions                                               */
/* -------------------------------------------------------------------------- */

describe("matching: CoreD overview", () => {
  it("answers overview questions", () => {
    assert.equal(idOf("What does CoreD do?"), "what-is-cored");
    assert.equal(idOf("Do you provide CRM services?"), "services-overview");
    assert.equal(idOf("Can you build a custom CRM?"), "custom-crm");
    assert.equal(idOf("what is crm"), "what-is-crm");
    assert.equal(idOf("Hello, what is CoreD?"), "what-is-cored");
  });
});

describe("matching: plans", () => {
  it("answers the Basic and Standard questions", () => {
    assert.equal(idOf("What is your Basic plan?"), "basic-plan");
    assert.equal(idOf("How many agents come with Basic?"), "basic-agent-count");
    assert.equal(idOf("What is the Standard plan?"), "standard-plan");
    assert.equal(idOf("How many AI agents are in Standard?"), "standard-agent-count");
    assert.equal(idOf("What is the difference between Basic and Standard?"), "basic-vs-standard");
    assert.equal(idOf("Can you create a custom AI CRM for my business?"), "custom-crm");
  });

  it("handles wording the knowledge base does not contain", () => {
    assert.equal(idOf("tell me about your basic package"), "basic-plan");
    assert.equal(idOf("basic or standard, which one?"), "basic-vs-standard");
    assert.equal(idOf("number of ai agents in the standard package"), "standard-agent-count");
    assert.equal(idOf("i want a tailored crm for my company"), "custom-crm");
    assert.equal(idOf("tell me about the plans"), "plans-overview");
    assert.equal(idOf("we only need one agent"), "basic-plan");
    assert.equal(idOf("I need three agents"), "standard-plan");
    assert.equal(idOf("my workflow is quite unusual and specific"), "when-custom-crm");
    assert.equal(idOf("how does an ai agent crm differ from a normal crm"), "traditional-vs-agent-crm");
  });

  it("understands common Hinglish phrasing", () => {
    assert.equal(idOf("Basic plan me kitne agent milte hain"), "basic-agent-count");
    assert.equal(idOf("CoreD kya karta hai?"), "what-is-cored");
    assert.equal(idOf("price kitna hai"), "pricing");
  });

  it("forgives a small typo in a long word", () => {
    assert.equal(idOf("pricng for custom crm"), "pricing");
  });
});

describe("matching: pricing and unsupported claims", () => {
  it("never answers pricing with a number", () => {
    for (const question of [
      "What is the price of Basic?",
      "How much does the Standard plan cost?",
      "what is the cheapest option",
      "do you offer discounts",
    ]) {
      const reply = findAnswer(question);
      assert.equal(reply?.id, "pricing", question);
      assert.doesNotMatch(reply.content, /\d|[$\u20B9]/);
      assert.equal(reply.action, "contact");
    }
  });

  it("does not guarantee results", () => {
    assert.equal(idOf("Do you guarantee a particular business result?"), "results-guarantee");
    assert.equal(idOf("will you guarantee more sales?"), "results-guarantee");
    assert.match(findAnswer("What results can I expect?").content, /can't promise/);
  });

  it("admits it has no verified details about integrations, channels and timelines", () => {
    assert.equal(idOf("how long will it take to deliver?"), "unconfirmed-details");
    assert.equal(idOf("can you do whatsapp automation"), "unconfirmed-details");
    assert.ok([null, "unconfirmed-details"].includes(idOf("do you integrate with salesforce?")));
  });

  it("points to the contact route without inventing contact details", () => {
    assert.equal(idOf("can I talk to someone?"), "contact-cored");
    const reply = findAnswer("How can I discuss my requirements with CoreD?");
    assert.equal(reply.id, "contact-cored");
    assert.equal(reply.action, "contact");
    assert.match(reply.content, /don't have a verified email/);
  });
});

describe("matching: unknown and off-topic input", () => {
  it("returns null instead of a wrong answer", () => {
    for (const question of [
      "What is the capital of France?",
      "Who is Krishanu Kaundilya?",
      "tell me a joke",
      "how is the weather today",
      "what is the best crm in the world",
      "what is the price of salesforce",
      "agent",
      "ai",
      "<script>alert(1)</script>",
      "zzzzzz qqqqq",
    ]) {
      assert.equal(findAnswer(question), null, question);
    }
  });

  it("does not echo visitor input back in an answer", () => {
    assert.equal(findAnswer('<img src=x onerror="alert(1)">'), null);
  });
});

/* -------------------------------------------------------------------------- */
/* Input validation                                                           */
/* -------------------------------------------------------------------------- */

describe("input validation", () => {
  it("rejects empty and whitespace-only messages", () => {
    assert.deepEqual(validateQuestion(""), { ok: false, reason: "empty" });
    assert.deepEqual(validateQuestion("   \n\t  "), { ok: false, reason: "empty" });
    assert.equal(findAnswer(""), null);
    assert.equal(findAnswer("    "), null);
  });

  it("rejects values that are not strings", () => {
    for (const value of [null, undefined, 42, {}, [], true, () => "hi", Symbol("x")]) {
      assert.deepEqual(validateQuestion(value), { ok: false, reason: "invalid" });
      assert.equal(findAnswer(value), null);
    }
  });

  it("enforces the length limit exactly", () => {
    assert.equal(MAX_QUESTION_LENGTH, 500);
    assert.equal(validateQuestion("a".repeat(MAX_QUESTION_LENGTH)).ok, true);
    assert.deepEqual(validateQuestion("a".repeat(MAX_QUESTION_LENGTH + 1)), { ok: false, reason: "too-long" });
    assert.equal(findAnswer("price ".repeat(200)), null);
  });

  it("cleans control characters and extra whitespace", () => {
    assert.deepEqual(validateQuestion("  what \u0000is\u0007  \n the   price?  "), {
      ok: true,
      value: "what is the price?",
    });
  });
});

/* -------------------------------------------------------------------------- */
/* Lookup by id and malformed data                                            */
/* -------------------------------------------------------------------------- */

describe("lookup by id", () => {
  it("returns the entry for a known id", () => {
    assert.equal(findAnswerById("basic-plan").id, "basic-plan");
  });

  it("returns null for unknown or malformed ids without throwing", () => {
    for (const id of ["nope", "", "__proto__", "constructor", "toString", null, undefined, 7, {}, []]) {
      assert.equal(findAnswerById(id), null);
    }
  });

  it("falls back to the typed text when the id is stale", () => {
    assert.equal(resolveAnswer({ question: "What is the Standard plan?", faqId: "removed-entry" }).id, "standard-plan");
    assert.equal(resolveAnswer({ question: "x", faqId: "basic-plan" }).id, "basic-plan");
    assert.equal(resolveAnswer(null), null);
    assert.equal(resolveAnswer("text"), null);
    assert.equal(resolveAnswer({}), null);
  });
});

describe("malformed knowledge base data", () => {
  const good = { id: "a", category: "x", questions: ["What is alpha?"], keywords: [], answer: "Alpha." };

  it("skips bad entries instead of throwing", () => {
    const engine = createAnswerEngine([
      null,
      5,
      "text",
      {},
      { id: "no-answer", questions: ["q"] },
      { id: "no-questions", answer: "x" },
      { id: "bad-questions", answer: "x", questions: [1, null, "  "] },
      { id: "bad-action", answer: "x", questions: ["something"], action: "open-url" },
      good,
      { ...good, answer: "Duplicate id." },
    ]);

    assert.ok(engine.issues.length > 0);
    assert.equal(engine.findAnswer("What is alpha?").content, "Alpha.");
    assert.equal(engine.findAnswerById("a").content, "Alpha.");
    assert.equal(engine.findAnswerById("no-answer"), null);
    assert.equal(engine.findAnswer("something").action, undefined);
  });

  it("copes with a knowledge base that is not an array", () => {
    for (const data of [undefined, null, "oops", 3, {}]) {
      const engine = createAnswerEngine(data);
      assert.ok(engine.issues.length > 0);
      assert.equal(engine.findAnswer("anything"), null);
      assert.equal(engine.findAnswerById("a"), null);
    }
  });

  it("reports repeated questions across entries", () => {
    const issues = validateKnowledgeBase([
      good,
      { id: "b", questions: ["what is alpha"], answer: "Beta." },
    ]);
    assert.equal(issues.length, 1);
    assert.match(issues[0], /already used/);
  });
});

/* -------------------------------------------------------------------------- */
/* Source hygiene                                                             */
/* -------------------------------------------------------------------------- */

describe("migrated source files", () => {
  const files = ["ChatbotWidget.jsx", "ChatbotWindow.jsx", "KnowledgeBase.js", "findAnswer.js"];
  const read = (name) => readFileSync(new URL(name, import.meta.url), "utf8");

  it("has no Next.js or TypeScript leftovers", () => {
    files.forEach((name) => {
      const source = read(name);
      assert.doesNotMatch(source, /next\/|"use client"|'use client'/, `${name}: Next.js leftover`);
      assert.doesNotMatch(source, /from "@\//, `${name}: path alias import`);
      assert.doesNotMatch(source, /\bimport type\b|\bsatisfies\b|\binterface\s+\w+|:\s*(string|number|boolean)\b(?!\s*[,)])/, `${name}: TypeScript syntax`);
    });
  });

  it("never injects HTML or evaluates code", () => {
    files.forEach((name) => {
      assert.doesNotMatch(read(name), /dangerouslySetInnerHTML|innerHTML|\beval\(|new Function\(/, name);
    });
  });

  it("stores nothing in the browser and calls no network API", () => {
    files.forEach((name) => {
      assert.doesNotMatch(read(name), /localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|XMLHttpRequest|console\./, name);
    });
  });
});

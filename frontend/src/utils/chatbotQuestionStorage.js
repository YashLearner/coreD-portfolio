const STORAGE_KEY = "cored_chatbot_unanswered_questions_v1";
const MAX_QUESTION_LENGTH = 500;
const MAX_SAVED_QUESTIONS = 300;

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `question-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readStoredQuestions() {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.question === "string" &&
        typeof item.createdAt === "string"
    );
  } catch {
    return [];
  }
}

/**
 * Save an unanswered chatbot question in THIS browser's localStorage.
 * This does not send data to CoreD or any server.
 */
export function saveUnansweredQuestion(value) {
  if (typeof value !== "string") {
    return { ok: false, reason: "invalid_type" };
  }

  const question = value.trim();
  if (question.length < 3) {
    return { ok: false, reason: "too_short" };
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return { ok: false, reason: "too_long" };
  }

  if (!isBrowser()) {
    return { ok: false, reason: "browser_storage_unavailable" };
  }

  try {
    const records = readStoredQuestions();

    // Avoid storing the same unanswered question repeatedly within a short window.
    const duplicate = records.find(
      (item) =>
        item.question.toLocaleLowerCase() === question.toLocaleLowerCase() &&
        Date.now() - new Date(item.createdAt).getTime() < 60 * 60 * 1000
    );

    if (duplicate) {
      return { ok: true, saved: false, reason: "duplicate_recent_question" };
    }

    const record = {
      id: createId(),
      question,
      status: "unanswered",
      createdAt: new Date().toISOString(),
    };

    const updated = [record, ...records].slice(0, MAX_SAVED_QUESTIONS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { ok: true, saved: true, question: record };
  } catch {
    // Storage can fail due to browser privacy settings or quota limits.
    return { ok: false, reason: "storage_unavailable" };
  }
}

/** Return unanswered questions stored in this browser only. */
export function getUnansweredQuestions() {
  return readStoredQuestions();
}

/** Download this browser's locally stored questions as a JSON file. */
export function downloadUnansweredQuestions() {
  if (!isBrowser()) {
    return { ok: false, reason: "browser_storage_unavailable" };
  }

  try {
    const data = getUnansweredQuestions();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `cored-unanswered-questions-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    return { ok: true, count: data.length };
  } catch {
    return { ok: false, reason: "download_failed" };
  }
}

/** Delete saved questions from this browser only. */
export function clearUnansweredQuestions() {
  if (!isBrowser()) {
    return { ok: false, reason: "browser_storage_unavailable" };
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return { ok: true };
  } catch {
    return { ok: false, reason: "storage_unavailable" };
  }
}

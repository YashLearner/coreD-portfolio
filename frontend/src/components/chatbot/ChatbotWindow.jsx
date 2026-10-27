import { useEffect, useRef, useState } from "react";

import { assistantCopy, contactChannel } from "../../data/KnowledgeBase.js";
import { MAX_QUESTION_LENGTH, resolveAnswer, validateQuestion } from "../lib/findAnswer.js";


/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const THINKING_DELAY_MS = 1600;
const QUESTION_INPUT_ID = "cored-chat-question";


// Only in-page anchors such as "#contact" are ever rendered as links.
const SAFE_ANCHOR = /^#[A-Za-z][\w-]*$/;

const WELCOME_MESSAGE = {
  id: "welcome-message",
  role: "assistant",
  content: assistantCopy.welcome,
};

function createMessage(id, role, content, action) {
  return { id, role, content, action };
}

/* -------------------------------------------------------------------------- */
/* Tailwind classes                                                           */
/* -------------------------------------------------------------------------- */

const chatbotStyles = {
  window: "flex h-full min-h-0 w-full flex-col overflow-hidden bg-white text-slate-900",

  header:
    "flex min-h-[76px] shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3 sm:px-6",

  brandGroup: "flex min-w-0 items-center gap-3",

  brandLogo:
    "size-11 shrink-0 overflow-hidden rounded-xl border border-blue-100 bg-blue-50",

  brandName: "text-sm font-bold leading-tight text-slate-950 sm:text-base",

  brandSubtitle: "mt-1 text-xs text-blue-600",

  headerActions: "flex shrink-0 items-center gap-2",

  headerButton:
    "grid size-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",

  mainPanel: "flex min-h-0 min-w-0 flex-1 flex-col bg-white",

  conversation:
    "flex min-h-0 flex-1 flex-col gap-7 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 sm:py-7 lg:px-8",

  messageRow: "flex w-full min-w-0 items-start gap-3",

  avatar: "mt-1 size-8 shrink-0 overflow-hidden rounded-lg",

  messageContent: "flex min-w-0 max-w-[92%] flex-col gap-1.5 sm:max-w-[85%]",

  sender: "px-1 text-[11px] font-medium text-slate-500",

  messageBubble:
    "m-0 rounded-[20px] border px-4 py-3 text-sm leading-relaxed [overflow-wrap:anywhere] whitespace-pre-wrap sm:text-[15px]",

  assistantBubble: "rounded-tl-md border-[#dce7e1] bg-[#edf4f0] text-[#17211d]",

  userBubble: "rounded-tr-md border-[#5271d3] bg-[#5271d3] text-white",

  contactLink:
    "inline-flex w-fit items-center rounded-full border border-[#5271d3] bg-white px-4 py-2 text-sm font-semibold text-[#5271d3] transition-colors hover:bg-[#5271d3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",

  suggestions: "flex flex-col items-start gap-2 pl-11",

  suggestionsTitle: "text-xs font-semibold text-slate-500",

  suggestionButton:
    "max-w-full shrink-0 whitespace-nowrap rounded-full border border-[#dce7e1] bg-[#edf4f0] px-3 py-2 text-left text-xs text-slate-700 transition-colors hover:border-[#c6d8ce] hover:bg-[#e2eee7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",

  limitNotice: "px-5 pb-1 text-xs text-amber-700",

  composer:
    "flex shrink-0 items-center gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:px-5 sm:py-4",

  questionInput:
    "min-w-0 flex-1 rounded-full border border-[#dce7e1] bg-[#eef4f1] px-5 py-4 text-sm text-[#24332d] outline-none transition-colors placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:text-[15px]",

  sendButton:
    "grid size-12 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50",

  sendButtonIdle: "bg-[#edf4f0] text-[#98a5b5]",

  sendButtonReady: "bg-[#5271d3] text-white",
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path
        d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Small components                                                           */
/* -------------------------------------------------------------------------- */

function AssistantAvatar() {
  return (
    <div className={chatbotStyles.avatar} aria-hidden="true">
      <img
        src={"/Images/ChatWindow.png"}
        alt=""
        width={32}
        height={32}
        decoding="async"
        className="size-full object-cover"
      />
    </div>
  );
}

function ThinkingIndicator() {
  const dot = "size-2 animate-bounce rounded-full bg-blue-500 motion-reduce:animate-none";

  return (
    <div
      className="flex w-full min-w-0 items-center gap-3"
      role="status"
      aria-label={`${assistantCopy.name} is typing`}
    >
      <AssistantAvatar />

      <div className="flex items-center gap-2.5 rounded-xl border border-[#dce7e1] bg-[#edf4f0] px-4 py-3">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className={`${dot} [animation-delay:-0.3s]`} />
          <span className={`${dot} [animation-delay:-0.15s]`} />
          <span className={dot} />
        </span>

        <span className="text-sm font-medium text-slate-500">Typing</span>
      </div>
    </div>
  );
}

function ChatHeader({ onReset, onClose }) {
  return (
    <header className={chatbotStyles.header}>
      <div className={chatbotStyles.brandGroup}>
        <div className={chatbotStyles.brandLogo} aria-hidden="true">
          <img
            src={"/Images/ChatWindow.png"}
            alt=""
            width={44}
            height={44}
            className="size-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h2 className={chatbotStyles.brandName}>{assistantCopy.name}</h2>
          <p className={chatbotStyles.brandSubtitle}>{assistantCopy.tagline}</p>
        </div>
      </div>

      <div className={chatbotStyles.headerActions}>
        <button
          type="button"
          className={chatbotStyles.headerButton}
          onClick={onReset}
          aria-label="Start a new conversation"
          title="Start a new conversation"
        >
          <ResetIcon />
        </button>

        {onClose && (
          <button
            type="button"
            className={chatbotStyles.headerButton}
            onClick={onClose}
            aria-label="Close chat"
            title="Close chat"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </header>
  );
}

function MessageItem({ message, onContactClick }) {
  const isUserMessage = message.role === "user";
  const showContactLink =
    !isUserMessage && message.action === "contact" && SAFE_ANCHOR.test(contactChannel.href);

  return (
    <div className={`${chatbotStyles.messageRow} ${isUserMessage ? "justify-end" : "justify-start"}`}>
      {!isUserMessage && <AssistantAvatar />}

      <div className={`${chatbotStyles.messageContent} ${isUserMessage ? "items-end" : "items-start"}`}>
        <span className={chatbotStyles.sender}>{isUserMessage ? "You" : assistantCopy.name}</span>

        {/* Plain text only: React escapes it, and nothing here is parsed as HTML. */}
        <p
          className={`${chatbotStyles.messageBubble} ${isUserMessage ? chatbotStyles.userBubble : chatbotStyles.assistantBubble
            }`}
        >
          {message.content}
        </p>

        {showContactLink && (
          <a href={contactChannel.href} className={chatbotStyles.contactLink} onClick={onContactClick}>
            {contactChannel.label}
          </a>
        )}
      </div>
    </div>
  );
}


const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:3000";

async function saveUnansweredQuestionToBackend(question) {
  try {
    const response = await fetch(
      `${CHATBOT_API_URL}/api/unanswered-questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to save unanswered question:",
        response.status
      );
    }
  } catch (error) {
    console.error("Could not reach chatbot backend:", error);
  }
}

/* -------------------------------------------------------------------------- */
/* Chat window                                                                */
/* -------------------------------------------------------------------------- */

export function ChatbotWindow({ onClose }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  // The question waiting for its reply: { question, faqId }, or null when idle.
  const [pending, setPending] = useState(null);

  const messageCounter = useRef(0);
  // State updates are asynchronous, so a ref is what actually stops two rapid
  // submits (double click, Enter twice) from sending the same message twice.
  const sendLock = useRef(false);
  const conversationEndRef = useRef(null);
  const inputRef = useRef(null);

  const isThinking = pending !== null;
  const canSend = !isThinking && inputValue.trim().length > 0;
  const isAtLimit = inputValue.length >= MAX_QUESTION_LENGTH;
  const showSuggestions = messages.length === 1 && assistantCopy.suggestions.length > 0;

  function nextMessageId(role) {
    messageCounter.current += 1;
    return `${role}-${messageCounter.current}`;
  }

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [messages, isThinking]);


  useEffect(() => {
    if (pending === null) return undefined;

    const responseTimer = window.setTimeout(() => {
      let reply = null;

      try {
        reply = resolveAnswer(pending);
      } catch {
        reply = null;
      }

      const resolvedReply = reply ?? assistantCopy.fallback;
      const fallbackContent = assistantCopy.fallback?.content;

      // Detect whether the question received the fallback answer.
      const isUnanswered =
        !reply ||
        reply?.isFallback === true ||
        reply?.matched === false ||
        (
          typeof fallbackContent === "string" &&
          resolvedReply?.content === fallbackContent
        );

      // Save only unanswered questions to the cloud database.
      if (isUnanswered) {
        void saveUnansweredQuestionToBackend(pending.question);
      }

      const { content, action } = resolvedReply;

      const assistantMessage = createMessage(
        nextMessageId("assistant"),
        "assistant",
        content,
        action
      );

      setMessages((current) => [...current, assistantMessage]);
      setPending(null);
      sendLock.current = false;
    }, THINKING_DELAY_MS);

    return () => window.clearTimeout(responseTimer);
  }, [pending]);

  function sendQuestion(rawQuestion, faqId) {
    if (sendLock.current) return;

    const checked = validateQuestion(rawQuestion);
    if (!checked.ok) return;

    sendLock.current = true;

    const userMessage = createMessage(nextMessageId("user"), "user", checked.value);
    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setPending({ question: checked.value, faqId });
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendQuestion(inputValue);
  }

  function handleResetConversation() {
    sendLock.current = false;
    setMessages([WELCOME_MESSAGE]);
    setPending(null);
    setInputValue("");
    inputRef.current?.focus();
  }

  return (
    <section className={chatbotStyles.window} aria-label={assistantCopy.chatLabel}>
      <ChatHeader onReset={handleResetConversation} onClose={onClose} />

      <div className={chatbotStyles.mainPanel}>
        <div
          className={chatbotStyles.conversation}
          role="log"
          aria-label="Conversation messages"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} onContactClick={onClose} />
          ))}

          {isThinking && <ThinkingIndicator />}

          {showSuggestions && (
            <div className={chatbotStyles.suggestions}>
              <p className={chatbotStyles.suggestionsTitle}>Try asking</p>

              <div className="flex max-w-full flex-nowrap items-center gap-2 overflow-x-auto">
                {assistantCopy.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.faqId}
                    type="button"
                    className={chatbotStyles.suggestionButton}
                    onClick={() => sendQuestion(suggestion.label, suggestion.faqId)}
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={conversationEndRef} aria-hidden="true" />
        </div>

        {isAtLimit && (
          <p className={chatbotStyles.limitNotice} role="status">
            Message limit of {MAX_QUESTION_LENGTH} characters reached.
          </p>
        )}

        <form className={chatbotStyles.composer} onSubmit={handleSubmit} aria-label="Send a message">
          <label htmlFor={QUESTION_INPUT_ID} className="sr-only">
            {assistantCopy.inputLabel}
          </label>

          <input
            ref={inputRef}
            id={QUESTION_INPUT_ID}
            className={chatbotStyles.questionInput}
            type="text"
            name="question"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={assistantCopy.inputPlaceholder}
            autoComplete="off"
            maxLength={MAX_QUESTION_LENGTH}
          />

          <button
            type="submit"
            className={`${chatbotStyles.sendButton} ${canSend ? chatbotStyles.sendButtonReady : chatbotStyles.sendButtonIdle
              }`}
            disabled={!canSend}
            aria-label="Send question"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </section>
  );
}

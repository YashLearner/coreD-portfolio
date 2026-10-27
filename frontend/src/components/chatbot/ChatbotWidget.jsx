import { useEffect, useRef, useState } from "react";

import { ChatbotWindow } from "./ChatbotWindow.jsx";
import { assistantCopy } from "../../data/KnowledgeBase.js";


const CHAT_PANEL_ID = "cored-chat-panel";


const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const chatbotWidgetStyles = {
  panel: "fixed inset-0 z-50 outline-none",

  launcher:
    "fixed bottom-5 right-5 z-[60] flex size-[76px] items-center justify-center overflow-hidden rounded-full border-0 bg-transparent p-0 shadow-none transition-transform duration-200 hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 sm:bottom-8 sm:right-8",

  launcherImage: "m-0 block size-full shrink-0 rounded-full object-cover p-0",
};

// The panel covers the whole screen, so Tab must not wander into the page behind it.
function keepFocusInside(event, container) {
  if (!container) return;

  const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

  if (focusable.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (!container.contains(active) || active === container) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function ChatbotWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const launcherButtonRef = useRef(null);
  const panelRef = useRef(null);
  const hasOpenedChatRef = useRef(false);

  useEffect(() => {
    if (!isChatOpen) return undefined;

    hasOpenedChatRef.current = true;
    panelRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsChatOpen(false);
      } else if (event.key === "Tab") {
        keepFocusInside(event, panelRef.current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isChatOpen]);

  useEffect(() => {
    if (!isChatOpen && hasOpenedChatRef.current) {
      launcherButtonRef.current?.focus();
    }
  }, [isChatOpen]);

  function handleOpenChat() {
    setIsChatOpen(true);
  }

  function handleCloseChat() {
    setIsChatOpen(false);
  }

  return (
    <>
      {isChatOpen ? (
        <div
          ref={panelRef}
          id={CHAT_PANEL_ID}
          className={chatbotWidgetStyles.panel}
          role="dialog"
          aria-label={assistantCopy.chatLabel}
          aria-modal="true"
          tabIndex={-1}
        >
          <ChatbotWindow onClose={handleCloseChat} />
        </div>
      ) : (
        <button
          ref={launcherButtonRef}
          type="button"
          className={chatbotWidgetStyles.launcher}
          onClick={handleOpenChat}
          aria-label="Open CoreD chat assistant"
          aria-haspopup="dialog"
          title="Open CoreD chat assistant"
        >
          <img
            src={"/Images/Chatbot.png"}
            alt=""
            aria-hidden="true"
            width={120}
            height={120}
            decoding="async"
            className={chatbotWidgetStyles.launcherImage}
          />
        </button>
      )}
    </>
  );
}


import { useEffect } from "react";

const REVEAL_SELECTOR =
  "h1, h2, h3, h4, p, li, blockquote, figure, img, button, [data-reveal]";

const INITIAL_CLASS = "global-reveal-init";
const VISIBLE_CLASS = "global-reveal-visible";
const WORD_CLASS = "global-reveal-word";

// Wrap individual words while preserving existing HTML and whitespace.
function wrapWords(element) {
  if (element.matches("img")) return;

  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue?.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        // Avoid wrapping words more than once.
        if (node.parentElement?.closest(`.${WORD_CLASS}`)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  let wordIndex = 0;

  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    const gradientParent =
      textNode.parentElement?.closest(".bg-clip-text");

    const gradientStyles = gradientParent
      ? window.getComputedStyle(gradientParent)
      : null;
    const parts = textNode.nodeValue.split(/(\s+)/);

    parts.forEach((part) => {
      if (!part) return;

      // Keep whitespace outside the word spans so text can wrap normally.
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      const word = document.createElement("span");

      word.className = WORD_CLASS;
      word.textContent = part;

      if (
        gradientStyles &&
        gradientStyles.backgroundImage !== "none"
      ) {
        word.style.backgroundImage = gradientStyles.backgroundImage;
        word.style.backgroundClip = "text";
        word.style.color = "transparent";
      }

      word.style.setProperty(
        "--word-delay",
        `${Math.min(wordIndex, 16) * 65}ms`
      );

      fragment.appendChild(word);
      wordIndex += 1;
    });

    textNode.replaceWith(fragment);
  });
}

export default function WordReveal() {
  useEffect(() => {
    const root = document.querySelector("main");

    if (!root) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      motionQuery.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const animatedElements = new Set();
    let observer;

    const revealElement = (element) => {
      if (
        !(element instanceof HTMLElement) ||
        element.classList.contains(INITIAL_CLASS)
      ) {
        return;
      }

      element.classList.add(INITIAL_CLASS);
      animatedElements.add(element);

      wrapWords(element);
      observer.observe(element);
    };

    const observeElements = (container) => {
      if (!(container instanceof HTMLElement)) return;

      if (container.matches(REVEAL_SELECTOR)) {
        revealElement(container);
      }

      container
        .querySelectorAll(REVEAL_SELECTOR)
        .forEach(revealElement);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    // Reveal the current page.
    observeElements(root);

    // Detect content added during React Router navigation.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeElements(node);
          }
        });
      });
    });

    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });

    // Respect accessibility preferences.
    const handleMotionChange = (event) => {
      if (event.matches) {
        observer.disconnect();
        mutationObserver.disconnect();

        animatedElements.forEach((element) => {
          element.classList.remove(
            INITIAL_CLASS,
            VISIBLE_CLASS
          );
        });
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();

      motionQuery.removeEventListener(
        "change",
        handleMotionChange
      );

      animatedElements.forEach((element) => {
        element.classList.remove(
          INITIAL_CLASS,
          VISIBLE_CLASS
        );
      });

      // Restore the original text nodes during cleanup.
      root.querySelectorAll(`.${WORD_CLASS}`).forEach((word) => {
        word.replaceWith(
          document.createTextNode(word.textContent ?? "")
        );
      });
    };
  }, []);

  return null;
}

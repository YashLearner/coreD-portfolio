
import { useEffect } from "react";

const REVEAL_SELECTOR =
  "h1, h2, h3, h4, p, li, blockquote, figure, img, button, [data-reveal]";

const INITIAL_CLASS = "global-reveal-init";
const VISIBLE_CLASS = "global-reveal-visible";

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

    // Animate the current page.
    observeElements(root);

    // Also detect content added when React Router changes pages.
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

    // Respect accessibility preferences if they change.
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
    };
  }, []);

  return null;
}

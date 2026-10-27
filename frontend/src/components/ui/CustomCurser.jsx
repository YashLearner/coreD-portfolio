
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)"
    );

    let cleanup = () => {};

    const setup = () => {
      cleanup();
      cleanup = () => {};

      if (!media.matches || !dot.current || !ring.current) {
        return;
      }

      const dotNode = dot.current;
      const ringNode = ring.current;

      let x = 0;
      let y = 0;
      let ringX = 0;
      let ringY = 0;
      let frame = 0;
      let visible = false;

      const animate = () => {
        ringX += (x - ringX) * 0.18;
        ringY += (y - ringY) * 0.18;

        ringNode.style.transform =
          `translate3d(${ringX}px, ${ringY}px, 0) ` +
          "translate(-50%, -50%)";

        if (
          visible &&
          (Math.abs(x - ringX) > 0.1 ||
            Math.abs(y - ringY) > 0.1)
        ) {
          frame = requestAnimationFrame(animate);
        } else {
          frame = 0;
        }
      };

      const move = (event) => {
        if (event.pointerType !== "mouse") return;

        x = event.clientX;
        y = event.clientY;

        if (!visible) {
          ringX = x;
          ringY = y;
          visible = true;

          document.documentElement.classList.add(
            "custom-cursor-active"
          );
        }

        dotNode.style.transform =
          `translate3d(${x}px, ${y}px, 0) ` +
          "translate(-50%, -50%)";

        dotNode.style.opacity = "1";
        ringNode.style.opacity = "1";

        const target = event.target;

        ringNode.classList.toggle(
          "cursor-hover",
          target instanceof Element &&
            Boolean(
              target.closest(
                'a, button, input, textarea, select, summary, [role="button"]'
              )
            )
        );

        if (!frame) {
          frame = requestAnimationFrame(animate);
        }
      };

      const hide = () => {
        visible = false;

        dotNode.style.opacity = "0";
        ringNode.style.opacity = "0";

        document.documentElement.classList.remove(
          "custom-cursor-active"
        );

        cancelAnimationFrame(frame);
        frame = 0;
      };

      window.addEventListener("pointermove", move, {
        passive: true,
      });

      document.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);

      cleanup = () => {
        hide();

        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
      };
    };

    setup();
    media.addEventListener("change", setup);

    return () => {
      cleanup();
      media.removeEventListener("change", setup);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="cursor-dot"
      />

      <div
        ref={ring}
        aria-hidden="true"
        className="cursor-ring"
      />
    </>
  );
}

export default CustomCursor;

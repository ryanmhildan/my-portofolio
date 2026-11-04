import { useEffect, useRef, type RefObject } from "react";

const IDLE_FRAME = 33;
const MAX_STEP = 1 / 20;

/**
 * Runs `frame` only while the element is on screen and the tab is visible. The loop paces itself
 * at 30 fps until `frame` returns true, which marks someone actively pulling at the surface.
 */
export function useVisibleLoop(
  ref: RefObject<HTMLElement | null>,
  frame: (dt: number) => boolean | void,
  { enabled }: { enabled: boolean },
) {
  const frameRef = useRef(frame);

  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    let last = 0;
    let busy = false;
    let onScreen = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const waited = now - last;
      if (waited < (busy ? 0 : IDLE_FRAME)) return;
      last = now;
      busy = frameRef.current(Math.min(waited / 1000, MAX_STEP)) === true;
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (onScreen && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, enabled]);
}

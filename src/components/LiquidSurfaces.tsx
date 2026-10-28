"use client";

import { useEffect } from "react";

// Elements that react like water: anything marked data-liquid, plus the hero's own buttons.
const SELECTOR = "[data-liquid], .sh-btn, .sh-txt";

/**
 * One delegated listener for the whole page instead of a hook per element: the light follows
 * the pointer across a surface, and a tap on a button sends a ripple out from where it landed.
 */
export function LiquidSurfaces() {
  useEffect(() => {
    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const surface = (target: EventTarget | null) =>
      target instanceof Element ? (target.closest(SELECTOR) as HTMLElement | null) : null;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = surface(e.target);
      if (!el) return;
      pending = { el, x: e.clientX, y: e.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!pending) return;
        const r = pending.el.getBoundingClientRect();
        pending.el.style.setProperty("--lx", `${pending.x - r.left}px`);
        pending.el.style.setProperty("--ly", `${pending.y - r.top}px`);
        pending.el.style.setProperty("--lo", "1");
      });
    };

    const onOut = (e: PointerEvent) => {
      const el = surface(e.target);
      if (el && !(e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) el.style.setProperty("--lo", "0");
    };

    const onDown = (e: PointerEvent) => {
      const el = surface(e.target);
      if (!el || reduce.matches || el.dataset.liquid === "card") return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const drop = document.createElement("span");
      drop.className = "liquid-ripple";
      drop.style.cssText = `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;width:${size}px;height:${size}px`;
      drop.addEventListener("animationend", () => drop.remove(), { once: true });
      el.appendChild(drop);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return null;
}

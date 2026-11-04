import { useEffect, useState, type RefObject } from "react";

// Same ceiling as the topography behind it: past 1.5 the shader cost grows and the edge barely sharpens.
const MAX_DPR = 1.5;

export function defaultMaxDpr() {
  return MAX_DPR;
}

/** Sets the backing store for a CSS size and returns the pixel ratio it used. */
export function sizeCanvas(canvas: HTMLCanvasElement, width: number, height: number, maxDpr: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return dpr;
}

export function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

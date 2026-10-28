"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useContent } from "../LangProvider";

const track = { title: "the cure", artist: "Olivia Rodrigo" };

// Numbered stand-ins for the track's synced lyrics, which the real app fetches from LRCLIB.
const times = ["00:12.40", "00:16.85", "00:21.10", "00:25.62"];

export function LyricsStatus() {
  const { dict } = useContent();
  const lines = times.map((t, n) => ({ t, text: `${dict.visuals.lyricsLine} ${n + 1}` }));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % times.length), 2600);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="rounded-xl bg-[#1e1f24] p-5 text-[#e6e6ea] sm:p-7">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="size-14 rounded-full bg-gradient-to-br from-[#b07d22] to-[#34502c]" />
          <span className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-[3px] border-[#1e1f24] bg-[#3ba55d]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium">ryan</div>
          <div className="relative mt-1 h-5 overflow-hidden text-sm text-[#b5b6bd]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={i}
                className="absolute inset-x-0 truncate"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span aria-hidden className="mr-1.5 inline-block -translate-y-px">
                  <svg viewBox="0 0 16 16" className="inline size-3 fill-current">
                    <path d="M6 2v8.3A2.5 2.5 0 1 0 7.5 12.5V5h5V2H6Z" />
                  </svg>
                </span>
                {lines[i].text}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-lg bg-white/[0.04] p-3">
        <div aria-hidden className="size-11 shrink-0 rounded-md bg-gradient-to-br from-[#c9a7d8] to-[#5b3f6e]" />
        <div className="min-w-0 text-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[#a3a4ad]">Spotify</div>
          <div className="truncate font-medium">{track.title}</div>
          <div className="truncate text-[#b5b6bd]">{track.artist}</div>
        </div>
      </div>

      <ol className="mt-5 space-y-1.5 border-t border-white/10 pt-5 font-mono text-xs">
        {lines.map((l, n) => (
          <li
            key={l.t}
            className={`flex gap-3 transition-colors duration-300 ${n === i ? "text-[#e7cf96]" : "text-[#8e8f99]"}`}
          >
            <span className="tabular-nums">[{l.t}]</span>
            <span className="truncate">{l.text}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-[#a3a4ad]">
        <span className="font-mono">Spotify → LRCLIB → Discord</span>
        <span>{dict.visuals.lyricsNote}</span>
      </p>
    </div>
  );
}

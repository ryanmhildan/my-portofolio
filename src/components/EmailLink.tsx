"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useContent } from "./LangProvider";

const EMAIL = "ryanmhildan@gmail.com";

export function EmailLink() {
  const { dict } = useContent();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Same glass drop as the hero's call to action, so the page opens and closes on one button. */}
      <a
        href={`mailto:${EMAIL}`}
        data-liquid="button"
        className="glass-pill glass-drop group inline-flex h-12 max-w-full items-center gap-2 rounded-full px-5 text-sm font-semibold sm:text-base"
      >
        <span className="truncate">{EMAIL}</span>
        <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </a>
      <button
        type="button"
        onClick={copy}
        data-liquid="button"
        className="glass-pill relative h-12 min-w-32 cursor-pointer overflow-hidden rounded-full px-5 text-sm font-semibold"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            className="block"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {copied ? dict.contact.copied : dict.contact.copy}
          </motion.span>
        </AnimatePresence>
        <span className="sr-only" aria-live="polite">
          {copied ? dict.contact.copiedLive : ""}
        </span>
      </button>
    </div>
  );
}

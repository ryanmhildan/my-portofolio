"use client";

import { motion } from "framer-motion";
import { useContent, useLang } from "../LangProvider";
import { ease } from "../Reveal";

const runs = [
  { name: "SVM linear", acc: 79.5 },
  { name: "SVM polynomial", acc: 76.9 },
  { name: "SVM RBF", acc: 81.2 },
  { name: "RBF + GridSearchCV", acc: 83.0, best: true },
];

// Axis starts at 70% so the differences between kernels stay legible.
const MIN = 70;
const MAX = 85;

export function SvmBars() {
  const { dict } = useContent();
  const v = dict.visuals;
  const sep = useLang() === "id" ? "," : ".";
  return (
    <figure className="rounded-xl bg-surface p-5 sm:p-7">
      <figcaption className="mb-6 flex items-baseline justify-between gap-4">
        <span className="text-sm text-muted">{v.svmCaption}</span>
        <span className="text-sm text-muted">{v.svmAxis}</span>
      </figcaption>
      <ul className="space-y-5">
        {runs.map((r, i) => (
          <li key={r.name}>
            <div className="mb-2 flex items-baseline justify-between text-sm">
              <span className={r.best ? "font-bold" : "text-fg-2"}>{r.name}</span>
              <span className="font-semibold tabular-nums">{r.acc.toFixed(1).replace(".", sep)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className={`h-full origin-left rounded-full ${r.best ? "bg-accent-ink" : "bg-muted/45"}`}
                style={{ width: `${((r.acc - MIN) / (MAX - MIN)) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        {v.svmNote}
      </p>
    </figure>
  );
}

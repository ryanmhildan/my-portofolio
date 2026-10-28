"use client";

import { Reveal } from "./Reveal";

// Every section opens with the same numbered heading: the index number is the page's recurring
// mark, and the one spot outside actions where the accent appears.
export function SectionHead({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
          <span className="font-bold tabular-nums text-accent-ink">{index}</span>
          <span aria-hidden className="h-px w-6 bg-line" />
          {eyebrow}
        </p>
        <h2 className="text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-7xl">{title}</h2>
      </div>
      {children}
    </Reveal>
  );
}

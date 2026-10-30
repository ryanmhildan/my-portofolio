"use client";

import { Reveal } from "./Reveal";

// The title carries the section; the short line under it says what is in it, read after the title.
export function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-7xl">{title}</h2>
        <p className="mt-4 max-w-md text-base text-muted md:text-lg">{eyebrow}</p>
      </div>
      {children}
    </Reveal>
  );
}

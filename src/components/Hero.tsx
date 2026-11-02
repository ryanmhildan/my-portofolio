"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { PortfolioDownload } from "./Downloads";
import { useContent } from "./LangProvider";
import { TopographyBackground } from "./ui/backgrounds-topography";

/** Splits the headline on its line breaks and sets the accent phrase in the italic face. */
function headline(text: string, accent: string): ReactNode[] {
  return text.split("\n").map((line, i) => {
    const at = line.indexOf(accent);
    return (
      <span key={i} className="block">
        {at < 0 ? (
          line
        ) : (
          <>
            {line.slice(0, at)}
            <span className="font-[family-name:var(--font-instrument)] font-normal italic tracking-[-0.02em] text-accent-ink">
              {accent}
            </span>
            {line.slice(at + accent.length)}
          </>
        )}
      </span>
    );
  });
}

export function Hero() {
  const { dict } = useContent();
  const h = dict.hero;

  return (
    <section id="beranda" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg text-fg">
      {/* The copy layer lets the pointer through, so the hill follows the cursor across the whole hero. */}
      <div className="absolute inset-0 -z-10 text-muted opacity-60">
        <TopographyBackground />
      </div>
      {/* Fades the lines out behind the copy so the text keeps its contrast. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-bg via-bg/90 to-transparent" />

      <div className="pointer-events-none flex flex-1 flex-col px-page pt-24 pb-[104px] sm:pt-28 sm:pb-10 lg:pb-12">
        {/* Availability and location sit apart from the intro, where a recruiter scans first. */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-fg-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5">
            <span aria-hidden className="size-2 rounded-full bg-accent-ink" />
            {h.statusValue}
          </p>
          <p className="rounded-full border border-line bg-surface px-3.5 py-1.5">{h.basedValue}</p>
        </div>

        <div className="min-h-16 flex-1" />

        <h1 className="max-w-[16ch] text-[clamp(40px,12vw,64px)] leading-[0.94] font-medium tracking-[-0.045em] text-balance sm:text-[clamp(48px,min(9vw,10vh),104px)] sm:leading-[0.92] lg:max-w-none lg:text-[clamp(56px,min(7vw,12vh),128px)]">
          {headline(h.headline, h.headlineAccent)}
        </h1>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <p className="max-w-[56ch] text-[15px] leading-relaxed tracking-[-0.01em] text-pretty text-fg-2 sm:text-base">{h.intro}</p>
          <div className="pointer-events-auto flex flex-wrap items-center gap-2.5 lg:justify-end">
            <a className="sh-btn" href="mailto:ryanmhildan@gmail.com">
              {h.ctaEmail}
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a className="sh-txt" href="#karya">
              {h.ctaWork}
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <PortfolioDownload />
          </div>
        </div>
      </div>
    </section>
  );
}

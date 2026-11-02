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
    <section id="beranda" className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-bg text-fg">
      {/* The copy layer lets the pointer through, so the hill follows the cursor across the whole hero. */}
      <div className="absolute inset-0 -z-10 text-muted opacity-70">
        <TopographyBackground />
      </div>
      {/* Fades the lines out behind the copy so the text keeps its contrast. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-linear-to-t from-bg via-bg/85 to-transparent" />

      <div className="pointer-events-none grid gap-7 px-page pt-28 pb-[104px] sm:pb-[clamp(28px,3.4vw,52px)] lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-end lg:gap-[clamp(24px,4vw,72px)]">
        <h1 className="text-[clamp(36px,12.5vw,60px)] leading-[0.94] font-medium tracking-[-0.045em] text-balance sm:text-[clamp(40px,min(9.5vw,9vh),96px)] sm:leading-[0.92] lg:text-[clamp(40px,min(6.6vw,11.5vh),124px)]">
          {headline(h.headline, h.headlineAccent)}
        </h1>
        <div className="max-w-[520px] lg:max-w-[400px] lg:justify-self-end lg:pb-[0.6em]">
          <p className="mb-5 text-[15px] leading-normal tracking-[-0.01em] text-pretty text-fg-2 sm:mb-[26px] sm:text-[clamp(15px,1.1vw,17px)]">
            {`${h.intro} ${h.statusValue}, ${h.basedValue}.`}
          </p>
          <div className="pointer-events-auto flex flex-wrap items-center gap-2.5">
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

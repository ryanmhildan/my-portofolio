"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PortfolioDownload } from "./Downloads";
import { useContent } from "./LangProvider";
import { TopographyBackground } from "./ui/backgrounds-topography";
import { LiquidText } from "./ui/liquid-text";

/** The name as liquid type, sized from the h1 so it keeps the headline's scale at every width. */
function HeroName({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(96);

  useEffect(() => {
    const read = () => {
      if (ref.current) setFontSize(parseFloat(getComputedStyle(ref.current).fontSize));
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return (
    <span ref={ref} className="block">
      <span className="sr-only">{text}</span>
      {/* The canvas box is 1.6em tall to leave room for pulled beads; the margins take that back. */}
      <span aria-hidden className="-my-[0.33em] block">
        <LiquidText text={text} fontSize={fontSize} fit={0.94} fontWeight={600} className="pointer-events-auto font-[family-name:var(--font-fredoka)]" />
      </span>
    </span>
  );
}

/** Splits the headline on its line breaks: the name goes liquid, the accent phrase in the italic face. */
function headline(text: string, accent: string): ReactNode[] {
  return text.split("\n").map((line, i) => {
    const at = line.indexOf(accent);
    return (
      <span key={i} className={i === 0 ? "block" : "mt-3 block text-[0.44em] leading-[1.1] tracking-[-0.03em] sm:mt-4 lg:text-[0.38em]"}>
        {i === 0 ? (
          <HeroName text={line} />
        ) : at < 0 ? (
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
      {/* Dims the lines behind the intro without hiding them, so they still run to the bottom edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-bg/70 via-bg/70 to-transparent sm:h-2/5" />

      <div className="pointer-events-none flex flex-1 flex-col px-page pt-24 pb-[104px] sm:pt-28 sm:pb-10 lg:pb-12">
        {/* Availability and location sit apart from the intro, where a recruiter scans first. */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-fg-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5">
            <span aria-hidden className="size-2 rounded-full bg-accent-ink" />
            {h.statusValue}
          </p>
          <p className="rounded-full border border-line bg-surface px-3.5 py-1.5">{h.basedValue}</p>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <h1 className="w-full text-center text-[clamp(44px,14vw,80px)] leading-[0.94] font-medium tracking-[-0.045em] text-balance sm:text-[clamp(64px,min(12vw,15vh),136px)] sm:leading-[0.92] lg:text-[clamp(80px,min(10vw,18vh),176px)]">
            {headline(h.headline, h.headlineAccent)}
          </h1>
        </div>

        <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
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

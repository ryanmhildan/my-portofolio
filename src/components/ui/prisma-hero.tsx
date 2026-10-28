"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CREAM = "#E1E0CC";
const ease = [0.16, 1, 0.3, 1] as const;

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span aria-hidden className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </span>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </span>
  );
};

/* ---------------- Hero ---------------- */
export interface PrismaHeroProps {
  /** Large display word set at viewport scale. */
  title: string;
  /** Text read by assistive tech in place of the display word, when it says more. */
  titleLabel?: string;
  showAsterisk?: boolean;
  description: React.ReactNode;
  /** Optional tab hanging from the top edge; leave out when the page has its own navigation. */
  navItems?: { label: string; href: string }[];
  navLabel?: string;
  cta: { label: string; href: string };
  videoSrc: string;
  /** Accessible labels for the play/pause control (moving video needs a way to stop it). */
  videoLabels: { pause: string; play: string };
  /** Extra controls placed in the content column, e.g. language and theme switches. */
  controls?: React.ReactNode;
  id?: string;
}

export const PrismaHero = ({
  title,
  titleLabel,
  showAsterisk = false,
  description,
  navItems,
  navLabel,
  cta,
  videoSrc,
  videoLabels,
  controls,
  id,
}: PrismaHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  // Follows the element's own play/pause events, so it is right even when autoplay is blocked.
  const [playing, setPlaying] = useState(false);

  // Reduced-motion visitors get the first frame instead of a looping video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    // Autoplay can start before hydration, so its play event never reaches React.
    const id = requestAnimationFrame(() => setPlaying(!video.paused));
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  return (
    <section id={id} className="h-dvh min-h-[560px] w-full p-2 sm:p-3">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#14130f] md:rounded-[2rem]">
        <video
          ref={videoRef}
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
        />

        {/* Grain over the video hides compression banding in its dark gradients. */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Darkens top and bottom so the nav and the text keep their contrast on any frame. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75" />

        {navItems && navItems.length > 0 && (
          <nav aria-label={navLabel} className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <ul className="flex items-center gap-1 rounded-b-2xl bg-black px-2 sm:gap-3 md:gap-6 md:rounded-b-3xl md:px-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex h-11 items-center px-2 text-xs text-[#E1E0CC]/80 transition-colors hover:text-[#E1E0CC] sm:text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="absolute inset-x-0 bottom-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1
                aria-label={titleLabel}
                className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[19vw] xl:text-[18vw]"
                style={{ color: CREAM }}
              >
                <WordsPullUp text={title} showAsterisk={showAsterisk} />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-24 sm:pb-6 lg:col-span-4 lg:pb-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="text-sm leading-snug text-[#E1E0CC]/85 md:text-base"
              >
                {description}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                className="flex flex-wrap items-center gap-3"
              >
                {/* The arrow marks the page's one outbound action; no other button carries it. */}
                <a
                  href={cta.href}
                  className="group inline-flex items-center gap-2 rounded-full py-1 pl-5 pr-1 text-sm font-semibold text-black transition-all hover:gap-3 sm:text-base"
                  style={{ backgroundColor: CREAM }}
                >
                  {cta.label}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight aria-hidden className="h-4 w-4" style={{ color: CREAM }} />
                  </span>
                </a>
                <button
                  type="button"
                  onClick={toggleVideo}
                  aria-label={playing ? videoLabels.pause : videoLabels.play}
                  title={playing ? videoLabels.pause : videoLabels.play}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#E1E0CC]/30 text-[#E1E0CC] transition-colors hover:bg-white/10"
                >
                  {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
                </button>
                {controls}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BriefcaseBusiness, House, LayoutGrid, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { locales, type Lang } from "@/data/content";
import { useContent, useLang } from "./LangProvider";
import { LiquidNavbar } from "./ui/liquid-glass-navbar";

type Tone = "light" | "dark";

// Remembered so a later visit to "/" lands on the same language (read by src/proxy.ts).
function saveLang(lang: Lang) {
  document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
}

// Same glass as the navbar: theme surface at 62%, theme line as the border.
const glass: Record<Tone, string> = {
  dark: "border-line bg-surface/60 text-fg shadow-[0_12px_32px_-14px_rgba(0,0,0,.6)]",
  light: "border-line bg-surface/60 text-fg shadow-[0_12px_32px_-14px_rgba(20,19,15,.32)]",
};

function LangSwitch() {
  const lang = useLang();
  const { dict } = useContent();
  const pathname = usePathname();
  // Same page in the other language: swap only the locale segment, keep the rest of the path.
  const pathFor = (next: Lang) => pathname.replace(/^\/(id|en)(?=\/|$)/, `/${next}`);

  // A plain link does a full page load: each language is its own root layout, and a soft
  // navigation would keep the other language's tree mounted in the background.
  function go(e: React.MouseEvent<HTMLAnchorElement>, next: Lang) {
    if (next === lang) {
      e.preventDefault();
      return;
    }
    saveLang(next);
    e.currentTarget.href = `${pathFor(next)}${window.location.hash}`;
  }

  return (
    <nav aria-label={dict.langLabel} className="flex text-xs font-semibold">
      {locales.map((l) => (
        <a
          key={l}
          href={pathFor(l)}
          hrefLang={l}
          lang={l}
          onClick={(e) => go(e, l)}
          data-liquid="button"
          aria-current={l === lang ? "true" : undefined}
          className={`inline-flex size-10 items-center justify-center rounded-full uppercase transition-colors ${
            l === lang ? "bg-fg text-bg" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </a>
      ))}
    </nav>
  );
}

type Theme = "light" | "dark";

const darkQuery = "(prefers-color-scheme: dark)";

// The active theme is an explicit data-theme on <html> when the visitor chose one, else the system setting.
function readTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

export function useTheme() {
  return useSyncExternalStore<Theme | null>(subscribeTheme, readTheme, () => null);
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function ThemeToggle() {
  const { dict } = useContent();
  const theme = useTheme();
  const label = theme === "dark" ? dict.themeToLight : dict.themeToDark;

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
      data-liquid="button"
      aria-label={label}
      title={label}
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100"
    >
      <motion.svg
        key={theme ?? "unset"}
        viewBox="0 0 20 20"
        className="size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: theme ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {theme === "dark" ? (
          // Sun: pressing it brings the light theme back.
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path
              d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" strokeLinejoin="round" />
        )}
      </motion.svg>
    </button>
  );
}

const SECTIONS = ["beranda", "karya", "pengalaman", "tentang", "kontak"] as const;
const iconProps = { size: 18, strokeWidth: 1.8, "aria-hidden": true } as const;

/** On a project page, `backHref` swaps the section navbar for a single way back to the list. */
export function Header({ backHref }: { backHref?: string } = {}) {
  const { dict } = useContent();
  const theme = useTheme();
  const [active, setActive] = useState(0);
  const lockUntil = useRef(0);

  // The drop follows the section in the middle of the screen; a tap holds it while the page scrolls there.
  useEffect(() => {
    if (backHref) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (performance.now() < lockUntil.current) return;
        for (const e of entries) {
          if (e.isIntersecting) setActive(SECTIONS.indexOf(e.target.id as (typeof SECTIONS)[number]));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [backHref]);

  const tone: Tone = theme === "dark" ? "dark" : "light";

  const items = [
    { href: "#beranda", label: dict.nav.home, icon: <House {...iconProps} /> },
    { href: "#karya", label: dict.nav.work, icon: <LayoutGrid {...iconProps} /> },
    { href: "#pengalaman", label: dict.nav.experience, icon: <BriefcaseBusiness {...iconProps} /> },
    { href: "#tentang", label: dict.nav.about, icon: <UserRound {...iconProps} /> },
    { href: "#kontak", label: dict.nav.contact, icon: <Mail {...iconProps} /> },
  ].map((item) => ({ ...item, fx: "pop" as const }));

  return (
    <header>
      <a
        href="#isi"
        className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2"
      >
        {dict.skip}
      </a>

      {backHref ? (
        <div className="fixed left-3 top-3 z-40 sm:left-5 sm:top-[22px]">
          <Link
            href={backHref}
            data-liquid="button"
            className={`inline-flex h-12 items-center gap-2 rounded-full border pl-3 pr-4 text-sm font-semibold backdrop-blur-md ${glass[tone]}`}
          >
            <ArrowLeft aria-hidden className="size-4" />
            {dict.work.back}
          </Link>
        </div>
      ) : (
      /* Top centre on wide screens; a bottom bar on phones, where the thumb is. */
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-auto sm:top-4">
        <LiquidNavbar
          items={items}
          active={active}
          onChange={(i) => {
            lockUntil.current = performance.now() + 1000;
            setActive(i);
          }}
          tone={tone}
          ariaLabel={dict.navLabel}
        />
      </div>
      )}

      {/* Second glass surface on the page, kept small: language and theme sit apart from navigation. */}
      <div
        className={`fixed right-3 top-3 z-40 flex items-center gap-0.5 rounded-full border p-1 backdrop-blur-md transition-colors sm:right-5 sm:top-[22px] ${glass[tone]}`}
      >
        <LangSwitch />
        <span aria-hidden className="mx-0.5 h-5 w-px bg-current opacity-20" />
        <ThemeToggle />
      </div>
    </header>
  );
}

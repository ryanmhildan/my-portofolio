"use client";

import Image from "next/image";
import type { Project } from "@/data/content";
import { LyricsStatus } from "./visuals/LyricsStatus";
import { SvmBars } from "./visuals/SvmBars";

export function ProjectVisual({
  project,
  priority = false,
  withExtras = false,
}: {
  project: Project;
  priority?: boolean;
  withExtras?: boolean;
}) {
  const v = project.visual;
  if (v.kind === "svm") return <SvmBars />;
  if (v.kind === "lyrics") return <LyricsStatus />;
  const main = (
    <div className={`overflow-hidden rounded-xl ${v.tone === "dark" ? "bg-[#0d0d10] p-5 sm:p-8" : ""}`}>
      <Image
        src={v.src}
        alt={v.alt}
        width={v.width}
        height={v.height}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        sizes="(min-width: 1024px) 680px, 100vw"
        className="h-auto w-full rounded-lg border border-line"
      />
    </div>
  );
  if (!withExtras || !v.extras?.length) return main;
  return (
    // The photo row takes up whatever height the text column leaves, cropping slightly instead of leaving a gap.
    <div className="flex h-full flex-col gap-3">
      {main}
      <div className="grid min-h-40 flex-1 grid-cols-2 gap-3">
        {v.extras.map((x) => (
          <Image
            key={x.src}
            src={x.src}
            alt={x.alt}
            width={x.width}
            height={x.height}
            sizes="(min-width: 1024px) 340px, 50vw"
            className="h-full w-full rounded-lg border border-line object-cover"
          />
        ))}
      </div>
    </div>
  );
}

// The GitHub mark (lucide no longer ships brand logos), drawn from GitHub's published path.
export function GitHubMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/** "GitHub" when a project has one repository; "GitHub · Web" / "GitHub · API" when it has several. */
export function repoLabel(project: Project, repo: Project["repos"][number]) {
  return project.repos.length > 1 && repo.short ? `GitHub · ${repo.short}` : "GitHub";
}

export function OutboundButton({
  href,
  children,
  newTab,
  label,
}: {
  href: string;
  children: React.ReactNode;
  newTab: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label ? `${label} ${newTab}` : undefined}
      data-liquid="button"
      className="glass-pill inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold"
    >
      {children}
      {!label && <span className="sr-only">{newTab}</span>}
    </a>
  );
}

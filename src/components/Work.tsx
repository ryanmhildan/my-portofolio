"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Project, Track } from "@/data/content";
import { useContent, useLang } from "./LangProvider";
import { GitHubMark, OutboundButton, ProjectVisual, repoLabel } from "./ProjectParts";
import { ease } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { TechChips } from "./TechChips";

// The thesis and RABmate are the two largest systems, so they get the full row; the rest pair up.
const FEATURED = new Set(["rice-harvest", "rabmate"]);

function ProjectCard({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  const { dict } = useContent();
  const lang = useLang();
  const detailHref = `/${lang}/projects/${project.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease }}
      data-liquid="card"
      className={`grid grid-cols-1 gap-6 rounded-[2rem] border border-line bg-surface p-4 sm:p-6 ${
        wide ? "md:col-span-2 lg:grid-cols-12 lg:gap-8" : ""
      }`}
    >
      <div
        className={`rounded-[1.5rem] bg-surface-2 p-3 sm:p-5 ${
          wide ? `lg:order-2 lg:col-span-7 ${project.visual.kind === "image" && project.visual.extras ? "" : "lg:self-start"}` : ""
        }`}
      >
        <ProjectVisual project={project} withExtras={wide} />
      </div>

      <div className={`flex flex-col px-1 pb-1 sm:px-2 ${wide ? "lg:order-1 lg:col-span-5 lg:py-2" : ""}`}>
        <div className="flex items-center justify-between gap-4 text-sm text-muted">
          <span>
            {project.kicker} · {project.year}
          </span>
          <span className="font-bold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <h3 className={`mt-3 font-medium tracking-[-0.035em] ${wide ? "text-3xl" : "text-2xl"}`}>{project.title}</h3>
        <p className="mt-3 leading-relaxed text-fg-2">{project.summary}</p>

        {project.facts && (
          <dl className="mt-6 flex gap-2">
            {project.facts.map((f) => (
              <div key={f.label} className="flex flex-1 flex-col-reverse rounded-xl bg-surface-2 px-3 py-3">
                <dt className="mt-1 text-xs leading-snug text-muted">{f.label}</dt>
                <dd className="text-xl font-medium tabular-nums tracking-tight">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-fg-2">
          {project.points.slice(0, 2).map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-muted/60" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <TechChips stack={project.stack} className="mt-5" />

        <div className="mt-5 flex flex-wrap gap-2 pt-1 lg:mt-auto lg:pt-6">
          {/* The arrow marks the one link that goes deeper into this site; outbound links carry an icon. */}
          <Link
            href={detailHref}
            aria-label={`${dict.work.details}: ${project.title}`}
            data-liquid="button"
            className="glass-pill glass-drop group inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold"
          >
            {dict.work.details}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.repos.map((r) => (
            <OutboundButton key={r.href} href={r.href} newTab={dict.work.newTab} label={`${repoLabel(project, r)} (${r.label})`}>
              <GitHubMark />
              {repoLabel(project, r)}
            </OutboundButton>
          ))}
          {project.live && (
            <OutboundButton href={project.live} newTab={dict.work.newTab}>
              {dict.work.demo}
            </OutboundButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const { dict, projects } = useContent();
  const [filter, setFilter] = useState<"all" | Track>("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.tracks.includes(filter));
  const filters: ("all" | Track)[] = ["all", "software", "ai"];

  // A lone half-width card would leave a hole in the grid, so an odd one out takes the full row.
  const regular = list.filter((p) => !FEATURED.has(p.slug));
  const loneSlug = regular.length % 2 === 1 ? regular[regular.length - 1].slug : null;

  return (
    <section id="karya" className="scroll-mt-24 px-page py-16 md:py-24">
      <SectionHead index="01" eyebrow={dict.work.eyebrow} title={dict.work.title}>
        <div role="group" aria-label={dict.work.filterLabel} className="glass-pill flex flex-wrap gap-0.5 self-start rounded-[1.5rem] p-1.5 md:self-auto">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-liquid="button"
              aria-pressed={filter === f}
              className={`relative h-10 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors ${
                filter === f ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  aria-hidden
                  className="glass-drop-inner absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{dict.work.filters[f]}</span>
            </button>
          ))}
        </div>
      </SectionHead>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} wide={FEATURED.has(p.slug) || p.slug === loneSlug} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

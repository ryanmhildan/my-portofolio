"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useContent, useLang } from "./LangProvider";
import { GitHubMark, OutboundButton, ProjectVisual, repoLabel } from "./ProjectParts";
import { Reveal, ease } from "./Reveal";
import { TechChips } from "./TechChips";

export function ProjectDetail({ slug }: { slug: string }) {
  const { dict, projects } = useContent();
  const lang = useLang();

  // Next.js keeps the list page's scroll offset here, because the page starts with a fixed header
  // it treats as already visible. Every project opens at its title instead.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) return <p className="px-5 pt-40 text-center text-muted">{dict.work.notFound}</p>;

  const d = project.detail;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const w = dict.work;

  return (
    <article className="px-page pb-24 pt-28 md:pt-36">
      {/* Title block */}
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
        <p className="flex items-center gap-3 text-sm font-medium text-muted">
          <span className="font-bold tabular-nums text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="h-px w-6 bg-line" />
          {project.kicker} · {project.year}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{project.summary}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.repos.map((r) => (
            <OutboundButton key={r.href} href={r.href} newTab={w.newTab} label={`${repoLabel(project, r)} (${r.label})`}>
              <GitHubMark />
              {repoLabel(project, r)}
            </OutboundButton>
          ))}
          {project.live && (
            <OutboundButton href={project.live} newTab={w.newTab}>
              {w.demo}
            </OutboundButton>
          )}
          {d?.links.map((x) => (
            <OutboundButton key={x.href} href={x.href} newTab={w.newTab}>
              <Download aria-hidden className="size-4" />
              {x.label}
            </OutboundButton>
          ))}
        </div>
      </motion.header>

      {/* Lead visual */}
      <motion.div
        className="mt-12 rounded-[2rem] border border-line bg-surface p-3 sm:p-6"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.12 }}
      >
        <div className="rounded-[1.5rem] bg-surface-2 p-3 sm:p-5">
          <ProjectVisual project={project} priority />
        </div>
      </motion.div>

      {/* Overview, facts and stack */}
      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="text-sm font-medium text-muted">{w.overview}</h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed">
            {d?.overview.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Reveal>
        <Reveal liquid delay={0.08} className="self-start rounded-[2rem] border border-line bg-surface p-6 lg:col-span-5">
          {project.facts && (
            <dl className="mb-6 flex gap-2">
              {project.facts.map((f) => (
                <div key={f.label} className="flex flex-1 flex-col-reverse rounded-xl bg-surface-2 px-3 py-3">
                  <dt className="mt-1 text-xs leading-snug text-muted">{f.label}</dt>
                  <dd className="text-xl font-medium tabular-nums tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <h2 className="text-sm font-medium text-muted">{w.stack}</h2>
          <TechChips stack={project.stack} className="mt-3" />
        </Reveal>
      </div>

      {/* Sections */}
      {d && (
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {d.sections.map((sec, i) => (
            <Reveal
              key={sec.title}
              liquid
              delay={(i % 2) * 0.06}
              className={`rounded-[2rem] border border-line bg-surface p-6 sm:p-8 ${
                d.sections.length % 2 === 1 && i === d.sections.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <h2 className="text-2xl font-medium tracking-[-0.035em]">{sec.title}</h2>
              <ul className="mt-5 space-y-3 leading-relaxed text-fg-2">
                {sec.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-muted/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      )}

      {/* Screenshots */}
      {d && d.gallery.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className="text-4xl font-medium leading-[0.9] tracking-[-0.05em] md:text-5xl">{w.gallery}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {d.gallery.map((g, i) => (
              <Reveal key={g.src} liquid delay={(i % 2) * 0.06} className="rounded-[2rem] border border-line bg-surface p-3 sm:p-4">
                <figure>
                  <a href={g.src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={g.width}
                      height={g.height}
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="h-auto w-full border border-line transition-transform duration-500 hover:scale-[1.015]"
                    />
                    <span className="sr-only">{w.openImage}</span>
                  </a>
                  <figcaption className="px-2 pb-1 pt-3 text-sm text-fg-2">{g.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {d?.note && <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">{d.note}</p>}

      {/* Previous / next */}
      <nav aria-label={w.title} className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/${lang}/projects/${prev.slug}`}
          data-liquid="button"
          className="group flex items-center gap-4 rounded-[1.5rem] border border-line bg-surface p-5"
        >
          <ArrowLeft aria-hidden className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block text-sm text-muted">{w.prev}</span>
            <span className="mt-0.5 block font-semibold">{prev.title}</span>
          </span>
        </Link>
        <Link
          href={`/${lang}/projects/${next.slug}`}
          data-liquid="button"
          className="group flex items-center justify-end gap-4 rounded-[1.5rem] border border-line bg-surface p-5 text-right"
        >
          <span>
            <span className="block text-sm text-muted">{w.next}</span>
            <span className="mt-0.5 block font-semibold">{next.title}</span>
          </span>
          <ArrowRight aria-hidden className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>

      <footer className="mt-12 flex flex-col justify-between gap-2 text-sm text-muted sm:flex-row">
        <span>© 2026 Ryan Muhammad Hildan</span>
        <Link href={`/${lang}#kontak`} className="link-underline self-start">
          {dict.nav.contact}
        </Link>
      </footer>
    </article>
  );
}

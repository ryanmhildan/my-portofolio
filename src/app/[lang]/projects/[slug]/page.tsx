import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { LiquidSurfaces } from "@/components/LiquidSurfaces";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getContent, hasLocale, locales } from "@/data/content";

type Params = PageProps<"/[lang]/projects/[slug]">["params"];

export function generateStaticParams() {
  const slugs = getContent("id").projects.map((p) => p.slug);
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = getContent(lang).projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} · Ryan Muhammad Hildan`;
  const url = `/${lang}/projects/${slug}`;
  const image = { url: `/${lang}/opengraph-image`, width: 1200, height: 630, alt: "Ryan Muhammad Hildan" };
  return {
    title,
    description: project.summary,
    alternates: { canonical: url, languages: { id: `/id/projects/${slug}`, en: `/en/projects/${slug}` } },
    // Replaces the layout's openGraph object, image included, so the shared fields are repeated here.
    openGraph: {
      type: "article",
      siteName: "Ryan Muhammad Hildan",
      title,
      description: project.summary,
      url,
      locale: lang === "id" ? "id_ID" : "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [image] },
  };
}

// Reading params is the only async step; keeping it inside Suspense lets navigation stay instant.
async function ProjectBody({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  if (!getContent(lang).projects.some((p) => p.slug === slug)) notFound();

  return (
    <>
      <Header backHref={`/${lang}#karya`} />
      <main id="isi">
        <ProjectDetail slug={slug} />
      </main>
    </>
  );
}

export default function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  return (
    <>
      <LiquidSurfaces />
      <Suspense fallback={null}>
        <ProjectBody params={params} />
      </Suspense>
    </>
  );
}

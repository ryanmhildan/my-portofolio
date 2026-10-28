import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortfolioDeck } from "@/components/print/PortfolioDeck";
import { hasLocale, locales } from "@/data/content";

// Print source for the PDFs in public/downloads (see scripts/build-downloads.mjs).
const docs = ["portfolio"] as const;

export function generateStaticParams() {
  return locales.flatMap((lang) => docs.map((doc) => ({ lang, doc })));
}

export const metadata: Metadata = {
  title: "Ryan Muhammad Hildan",
  robots: { index: false, follow: false },
};

async function Doc({ params }: { params: PageProps<"/[lang]/print/[doc]">["params"] }) {
  const { lang, doc } = await params;
  if (!hasLocale(lang) || doc !== "portfolio") notFound();
  return <PortfolioDeck lang={lang} />;
}

export default function PrintPage({ params }: PageProps<"/[lang]/print/[doc]">) {
  return (
    <Suspense fallback={null}>
      <Doc params={params} />
    </Suspense>
  );
}

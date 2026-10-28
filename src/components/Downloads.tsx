"use client";

import { Download } from "lucide-react";
import { useContent, useLang } from "./LangProvider";

// Printed by scripts/build-downloads.mjs from /[lang]/print/portfolio.
const portfolioFile = { id: "/downloads/Portofolio-Ryan-Hildan.pdf", en: "/downloads/Portfolio-Ryan-Hildan.pdf" } as const;

/** Hero button, styled like the hero's other calls to action. */
export function PortfolioDownload() {
  const { dict } = useContent();
  const lang = useLang();
  return (
    <a href={portfolioFile[lang]} download className="sh-txt">
      {dict.download.portfolio}
      <Download aria-hidden className="size-4" />
    </a>
  );
}

/** Contact section button. */
export function PortfolioDownloadRow() {
  const { dict } = useContent();
  const lang = useLang();
  return (
    <div>
      <p className="text-sm text-muted">{dict.download.note}</p>
      <a
        href={portfolioFile[lang]}
        download
        data-liquid="button"
        className="glass-pill mt-3 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold"
      >
        <Download aria-hidden className="size-4" />
        {dict.download.portfolio}
      </a>
    </div>
  );
}

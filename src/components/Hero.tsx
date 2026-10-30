"use client";

import { PortfolioDownload } from "./Downloads";
import { useTheme } from "./Header";
import { useContent } from "./LangProvider";
import SculptureHero from "./ui/liquid-sculpture-hero";

// Same values as --bg in globals.css: the shader recolours the sculpture's own backdrop to these,
// so the hero has to know them as real colours rather than CSS variables.
const PAGE_BG = { light: "#ECEADD", dark: "#0E0D0A" };
const INK = { light: "#14130F", dark: "#E1E0CC" };
const AMBER = { light: "#8A5410", dark: "#E0A458" };

export function Hero() {
  const { dict } = useContent();
  const h = dict.hero;
  const theme = useTheme() ?? "light";

  return (
    <div id="beranda">
      <SculptureHero
        theme={theme}
        themeToggle={false}
        showNav={false}
        topInset={88}
        showCredit={false}
        loadFonts={false}
        headingFont="var(--font-poppins), system-ui, sans-serif"
        bodyFont="var(--font-poppins), system-ui, sans-serif"
        accentFont="var(--font-instrument), 'Times New Roman', serif"
        background={PAGE_BG.light}
        darkBackground={PAGE_BG.dark}
        textColor={INK[theme]}
        accentColor={AMBER[theme]}
        imageAlt={h.sculptureAlt}
        eyebrow=""
        headline={h.headline}
        headlineAccent={h.headlineAccent}
        body={`${h.intro} ${h.statusValue}, ${h.basedValue}.`}
        primaryCta={{ label: h.ctaEmail, href: "mailto:ryanmhildan@gmail.com" }}
        secondaryCta={{ label: h.ctaWork, href: "#karya" }}
        ctaExtra={<PortfolioDownload />}
        hint={h.hint}
        hintTouch={h.hintTouch}
        backdropText="hildan"
      />
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { LangProvider } from "@/components/LangProvider";
import { getContent, hasLocale, locales } from "@/data/content";
import "../globals.css";

// Manrope: open, geometric-humanist forms that read friendly and technical at once, and a weight
// range (200 to 800) wide enough to carry both headlines and body text in a single family.
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
// Italic accent face the sculpture hero sets its key phrase in.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Absolute base for share links and og:image. Vercel sets the production domain at build time.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://my-portofolio-liart-delta.vercel.app";

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = "Ryan Muhammad Hildan";
  const description = getContent(lang).dict.metaDescription;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: `/${lang}`, languages: { id: "/id", en: "/en", "x-default": "/en" } },
    openGraph: {
      type: "website",
      siteName: title,
      title,
      description,
      url: `/${lang}`,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? "en_US" : "id_ID",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceadd" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0a" },
  ],
};

// Applies the saved theme before first paint so a stored choice never flashes the other theme.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${instrumentSerif.variable} antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="min-h-dvh">
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}

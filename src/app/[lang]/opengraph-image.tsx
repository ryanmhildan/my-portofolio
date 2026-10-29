import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent, hasLocale, locales } from "@/data/content";

// Link preview card for LinkedIn, WhatsApp, and the like. Project pages inherit it.
export const alt = "Ryan Muhammad Hildan, software engineer and computer vision";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const { dict } = getContent(lang);
  const map = await readFile(join(process.cwd(), "public/projects/rice/web-banner.jpg"));
  const mapSrc = `data:image/jpeg;base64,${map.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0e0d0a", color: "#eceadd", padding: 64, gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ fontSize: 26, color: "#a39f8c" }}>{lang === "id" ? "Portofolio" : "Portfolio"}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>Ryan M Hildan</div>
            <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.3, color: "#c9c5b2" }}>{dict.metaDescription}</div>
          </div>
          <div style={{ fontSize: 24, color: "#e7cf96" }}>Laravel · Next.js · Python · OpenCV · FastAPI</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img, not next/image */}
        <img src={mapSrc} alt="" width={420} height={502} style={{ objectFit: "cover", borderRadius: 24 }} />
      </div>
    ),
    size,
  );
}

/* eslint-disable @next/next/no-img-element -- printed to PDF: plain <img> loads eagerly, next/image would lazy-load */
import { Fragment } from "react";
import { TechChips } from "@/components/TechChips";
import { getContent, type Lang, type Project } from "@/data/content";

// 16:9 slides printed to PDF by scripts/build-downloads.mjs. Same paper, ink, amber and type as the site,
// with colours fixed here so the PDF never picks up the dark theme.
const css = `
@page { size: 1280px 720px; margin: 0; }
html, body { background: #eceadd !important; margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.deck { font-family: var(--font-manrope), system-ui, sans-serif; color: #14130f; }
.slide { width: 1280px; height: 720px; box-sizing: border-box; padding: 64px 72px 56px; position: relative; overflow: hidden;
  background: #eceadd; break-after: page; display: flex; flex-direction: column; }
.slide:last-child { break-after: auto; }
.eyebrow { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 500; color: #5e5a4b; }
.eyebrow b { color: #8a5410; font-variant-numeric: tabular-nums; }
.eyebrow i { display: block; width: 28px; height: 1px; background: #d3cfbc; }
.foot { position: absolute; left: 72px; right: 72px; bottom: 28px; display: flex; justify-content: space-between; font-size: 12px; color: #5e5a4b; }
.h-xl { font-size: 104px; line-height: .9; letter-spacing: -.055em; font-weight: 500; margin: 0; }
.h-l { font-size: 52px; line-height: .98; letter-spacing: -.045em; font-weight: 500; margin: 0; }
.accent { font-family: var(--font-instrument), serif; font-style: italic; font-weight: 400; letter-spacing: -.02em; color: #8a5410; }
.lead { font-size: 19px; line-height: 1.5; color: #48453a; margin: 0; }
.card { background: #f6f5ec; border: 1px solid #d3cfbc; border-radius: 28px; padding: 26px; }
.muted { color: #5e5a4b; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
ul.dots { margin: 0; padding: 0; list-style: none; display: grid; gap: 9px; }
ul.dots li { display: flex; gap: 12px; font-size: 15.5px; line-height: 1.45; color: #48453a; }
ul.dots li::before { content: ""; flex: none; width: 6px; height: 6px; border-radius: 50%; background: #a39d86; margin-top: .6em; }
.facts { display: flex; gap: 10px; }
.facts div { flex: 1; background: #e2dfcf; border-radius: 14px; padding: 12px 14px; }
.facts strong { display: block; font-size: 24px; font-weight: 500; letter-spacing: -.02em; }
.facts span { font-size: 12.5px; color: #5e5a4b; }
.chips { margin-bottom: 6px; }
.chips li { border-color: #d3cfbc; background: #e2dfcf; color: #48453a; }
.links { font-size: 13px; color: #14130f; font-weight: 600; }
.shot { background: #e2dfcf; border-radius: 22px; padding: 14px; display: flex; align-items: center; justify-content: center; min-height: 0; }
.shot img { display: block; max-width: 100%; max-height: 100%; border-radius: 10px; border: 1px solid #d3cfbc; object-fit: contain; }
.shot.dark { background: #0d0d10; }
.shot.dark img { border-color: #24242a; }
.bars { width: 100%; display: grid; gap: 20px; padding: 18px; }
.bar-row { display: grid; gap: 7px; font-size: 14px; }
.bar-row div:first-child { display: flex; justify-content: space-between; }
.bar { height: 14px; border-radius: 999px; background: #d3cfbc; overflow: hidden; }
.bar span { display: block; height: 100%; border-radius: inherit; background: #5e5a4b; }
.bar.best span { background: #8a5410; }
figure { margin: 0; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
figcaption { font-size: 13px; color: #48453a; }
`;

const copy = {
  id: {
    deck: "Portofolio",
    role: "Software engineer yang juga mengerjakan",
    about: "Tentang",
    experience: "Pengalaman",
    work: "Proyek",
    thesisShots: "Dari foto drone ke verdict",
    contact: "Kontak",
    contactTitle: ["Punya proyek atau posisi yang cocok? ", "Kirim email."],
    site: "Versi lengkap dengan screenshot",
    svmCaption: "Akurasi pada 1.000 citra uji",
    status: "Terbuka untuk posisi penuh waktu",
  },
  en: {
    deck: "Portfolio",
    role: "A software engineer who also works on",
    about: "About",
    experience: "Experience",
    work: "Projects",
    thesisShots: "From drone photos to a verdict",
    contact: "Contact",
    contactTitle: ["Have a project or a role that fits? ", "Send an email."],
    site: "Full version with screenshots",
    svmCaption: "Accuracy on 1,000 test images",
    status: "Open to full-time roles",
  },
};

const svmRuns = [
  { name: "SVM linear", acc: 79.5 },
  { name: "SVM polynomial", acc: 76.9 },
  { name: "SVM RBF", acc: 81.2 },
  { name: "RBF + GridSearchCV", acc: 83.0, best: true },
];

function Foot({ page, total }: { page: number; total: number }) {
  return (
    <div className="foot">
      <span>Ryan Muhammad Hildan</span>
      <span>
        {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function Visual({ project, lang }: { project: Project; lang: Lang }) {
  const v = project.visual;
  if (v.kind === "image") {
    return (
      <div className={`shot ${v.tone === "dark" ? "dark" : ""}`} style={{ flex: 1 }}>
        <img src={v.src} alt={v.alt} />
      </div>
    );
  }
  if (v.kind === "svm") {
    const sep = lang === "id" ? "," : ".";
    return (
      <div className="shot" style={{ flex: 1 }}>
        <div className="bars">
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>
            {copy[lang].svmCaption}
          </p>
          {svmRuns.map((r) => (
            <div key={r.name} className="bar-row">
              <div>
                <span>{r.name}</span>
                <strong>{r.acc.toFixed(1).replace(".", sep)}%</strong>
              </div>
              <div className={`bar ${r.best ? "best" : ""}`}>
                <span style={{ width: `${((r.acc - 70) / 15) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // No screenshot for this one: its detail sections carry the slide instead.
  return (
    <div className="card" style={{ flex: 1, display: "grid", gap: 18, alignContent: "start" }}>
      {project.detail?.sections.slice(0, 2).map((s) => (
        <div key={s.title}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 16 }}>{s.title}</p>
          <ul className="dots">
            {s.items.slice(0, 3).map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PortfolioDeck({ lang }: { lang: Lang }) {
  const { dict, projects, experience, skills } = getContent(lang);
  const c = copy[lang];
  const thesisShots = projects.find((p) => p.slug === "rice-harvest")?.detail?.gallery.filter((g) => g.src.includes("/api-")).slice(0, 4) ?? [];
  // Cover, about, experience, then the projects; the thesis gets a second slide for its results.
  const thesisIndex = projects.findIndex((p) => p.slug === "rice-harvest");
  const extraAfter = thesisShots.length ? thesisIndex : -1;
  const projectPage = (i: number) => 4 + i + (extraAfter >= 0 && i > extraAfter ? 1 : 0);
  const total = 3 + projects.length + (extraAfter >= 0 ? 1 : 0) + 1;
  const [leadA, leadEm, leadEnd] = dict.about.lead;

  return (
    <main className="deck">
      <style>{css}</style>

      {/* Cover */}
      <section className="slide" style={{ justifyContent: "space-between" }}>
        <p className="eyebrow">
          <b>{c.deck}</b>
          <i />
          2026
        </p>
        <div>
          <h1 className="h-xl">Ryan Muhammad Hildan</h1>
          <p className="h-l" style={{ marginTop: 22, fontSize: 46 }}>
            {c.role} <span className="accent">computer vision.</span>
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40 }}>
          <p className="lead" style={{ maxWidth: 620 }}>
            {dict.hero.intro}
          </p>
          <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.7, textAlign: "right" }}>
            ryanmhildan@gmail.com
            <br />
            github.com/ryanmhildan
            <br />
            {c.status}
          </p>
        </div>
      </section>

      {/* About and skills */}
      <section className="slide">
        <p className="eyebrow">
          <b>01</b>
          <i />
          {c.about}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 48, marginTop: 36, flex: 1 }}>
          <div>
            <p style={{ margin: 0, fontSize: 34, lineHeight: 1.22, letterSpacing: "-.035em", fontWeight: 700 }}>
              {leadA}
              <span style={{ color: "#48453a" }}>{leadEm}</span>
              {leadEnd}
            </p>
            <div style={{ marginTop: 26, display: "grid", gap: 14 }}>
              {dict.about.body.map((p) => (
                <p key={p} className="lead" style={{ fontSize: 17 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="card" style={{ alignSelf: "start" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15 }}>{dict.about.skills}</p>
            {skills.map((s) => (
              <div key={s.group} style={{ padding: "11px 0", borderTop: "1px solid #d3cfbc" }}>
                <p className="muted" style={{ margin: 0, fontSize: 13 }}>
                  {s.group}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 15, fontWeight: 500 }}>{s.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
        <Foot page={2} total={total} />
      </section>

      {/* Experience */}
      <section className="slide">
        <p className="eyebrow">
          <b>02</b>
          <i />
          {c.experience}
        </p>
        <div className="card" style={{ marginTop: 36, padding: 0 }}>
          {experience.map((e, i) => (
            <div
              key={e.org}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 340px 1fr",
                gap: 32,
                padding: "26px 30px",
                borderTop: i ? "1px solid #d3cfbc" : "none",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>{e.period}</p>
                <p className="muted" style={{ margin: "3px 0 0", fontSize: 14 }}>
                  {e.note}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>{e.role}</p>
                <p className="muted" style={{ margin: "3px 0 0", fontSize: 14 }}>
                  {e.org}, Bandung
                </p>
              </div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.5, color: "#48453a" }}>{e.body}</p>
            </div>
          ))}
        </div>
        <Foot page={3} total={total} />
      </section>

      {/* One slide per project, plus the thesis results right after the thesis */}
      {projects.map((p, i) => (
        <Fragment key={p.slug}>
              <section className="slide">
                <p className="eyebrow">
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <i />
                  {c.work} · {p.kicker} · {p.year}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "5fr 6fr", gap: 40, marginTop: 26, flex: 1, minHeight: 0, paddingBottom: 18 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <h2 className="h-l" style={{ fontSize: 44 }}>
                      {p.title}
                    </h2>
                    <p className="lead" style={{ fontSize: 16.5 }}>
                      {p.summary}
                    </p>
                    {p.facts && (
                      <div className="facts">
                        {p.facts.map((f) => (
                          <div key={f.label}>
                            <strong>{f.value}</strong>
                            <span>{f.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <ul className="dots">
                      {/* Each extra repo line, and a second row of stack chips, cost the slide one point. */}
                      {p.points.slice(0, p.facts ? 4 - p.repos.length - (p.stack.length > 6 ? 1 : 0) : 4).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div style={{ marginTop: "auto", display: "grid", gap: 6 }}>
                      <TechChips stack={p.stack} className="chips" />
                      {[...p.repos.map((r) => r.href), ...(p.live ? [p.live] : [])].map((href) => (
                        <p key={href} className="links" style={{ margin: 0 }}>
                          {href.replace("https://", "")}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", minHeight: 0 }}>
                    <Visual project={p} lang={lang} />
                  </div>
                </div>
                <Foot page={projectPage(i)} total={total} />
              </section>
              {i === extraAfter && (
                <section className="slide">
                  <p className="eyebrow">
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <i />
                    {p.title}
                  </p>
                  <h2 className="h-l" style={{ fontSize: 40, marginTop: 14 }}>
                    {c.thesisShots}
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: "auto", marginBottom: "auto", alignItems: "start" }}>
                    {thesisShots.map((g) => (
                      <figure key={g.src}>
                        <div className="shot" style={{ padding: 10, height: 300 }}>
                          <img src={g.src} alt={g.alt} />
                        </div>
                        <figcaption>{g.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                  <Foot page={projectPage(i) + 1} total={total} />
                </section>
              )}
        </Fragment>
      ))}

      {/* Contact */}
      <section className="slide" style={{ justifyContent: "space-between" }}>
        <p className="eyebrow">
          <b>{String(projects.length + 1).padStart(2, "0")}</b>
          <i />
          {c.contact}
        </p>
        <h2 className="h-xl" style={{ fontSize: 84, maxWidth: 1000 }}>
          {c.contactTitle[0]}
          <span style={{ color: "#48453a" }}>{c.contactTitle[1]}</span>
        </h2>
        <div className="grid2" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            ["Email", "ryanmhildan@gmail.com"],
            [dict.contact.phone, "+62 851-7409-6662"],
            ["LinkedIn", "linkedin.com/in/ryanmhildan"],
            ["GitHub", "github.com/ryanmhildan"],
          ].map(([k, v]) => (
            <div key={k} className="card" style={{ padding: 18, borderRadius: 18 }}>
              <p className="muted" style={{ margin: 0, fontSize: 13 }}>
                {k}
              </p>
              <p style={{ margin: "4px 0 0", fontWeight: 700, fontSize: 15 }}>{v}</p>
            </div>
          ))}
        </div>
        <Foot page={total} total={total} />
      </section>
    </main>
  );
}

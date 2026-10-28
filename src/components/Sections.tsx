"use client";

import { PortfolioDownloadRow } from "./Downloads";
import { EmailLink } from "./EmailLink";
import { useContent } from "./LangProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { TechStack } from "./TechStack";

export function Experience() {
  const { dict, experience } = useContent();

  return (
    <section id="pengalaman" className="scroll-mt-24 px-page py-16 md:py-24">
      <SectionHead index="02" eyebrow={dict.experience.eyebrow} title={dict.experience.title} />

      <ol data-liquid="card" className="divide-y divide-line rounded-[2rem] border border-line bg-surface">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.org} delay={i * 0.06} className="grid gap-3 p-6 sm:p-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <div className="font-bold tabular-nums">{e.period}</div>
              <div className="mt-1 text-sm text-muted">{e.note}</div>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-lg font-bold leading-snug tracking-tight">{e.role}</h3>
              <p className="mt-1 text-sm text-muted">{e.org}, Bandung</p>
            </div>
            <p className="leading-relaxed text-fg-2 md:col-span-5">{e.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function About() {
  const { dict } = useContent();
  const [leadA, leadEm, leadEnd] = dict.about.lead;

  return (
    <section id="tentang" className="scroll-mt-24 px-page py-16 md:py-24">
      <SectionHead index="03" eyebrow={dict.about.eyebrow} title={dict.nav.about} />

      <Reveal className="max-w-3xl">
        <p className="text-2xl font-bold leading-snug tracking-[-0.035em] md:text-3xl">
          {leadA}
          <span className="text-fg-2">{leadEm}</span>
          {leadEnd}
        </p>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-fg-2">
          {dict.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Reveal>

      <TechStack />
    </section>
  );
}

export function Contact() {
  const { dict } = useContent();
  const c = dict.contact;
  const contacts = [
    { label: c.phone, text: "+62 851-7409-6662", href: "https://wa.me/6285174096662" },
    { label: "GitHub", text: "github.com/ryanmhildan", href: "https://github.com/ryanmhildan" },
    { label: "LinkedIn", text: "linkedin.com/in/ryanmhildan", href: "https://linkedin.com/in/ryanmhildan" },
  ];

  return (
    <section id="kontak" className="scroll-mt-24 px-page pb-8 pt-16 md:pt-24">
      <SectionHead index="04" eyebrow={c.eyebrow} title={dict.nav.contact} />

      <Reveal liquid className="rounded-[2rem] border border-line bg-surface p-6 sm:p-10 md:p-14">
        <h3 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.05em] md:text-5xl">
          {c.title[0]}
          <span className="text-fg-2">{c.title[1]}</span>
        </h3>

        <div className="mt-10">
          <EmailLink />
        </div>

        <div className="mt-8">
          <PortfolioDownloadRow />
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {contacts.map((x) => (
            <li key={x.href}>
              <a
                href={x.href}
                data-liquid="button"
                target="_blank"
                rel="noreferrer"
                className="block h-full rounded-2xl bg-surface-2 p-4 transition-colors hover:bg-accent-soft"
              >
                <span className="block text-sm text-muted">{x.label}</span>
                <span className="mt-1 block font-semibold break-words">{x.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <footer className="mt-12 flex flex-col justify-between gap-2 text-sm text-muted sm:flex-row">
        <span>© 2026 Ryan Muhammad Hildan</span>
        <span>{c.footer}</span>
      </footer>
    </section>
  );
}

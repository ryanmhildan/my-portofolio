"use client";

import {
  siDocker,
  siFastapi,
  siGit,
  siJupyter,
  siLaravel,
  siLeaflet,
  siLivewire,
  siMysql,
  siNextdotjs,
  siNumpy,
  siOllama,
  siOpencv,
  siPandas,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siSqlite,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { useContent } from "./LangProvider";
import { Reveal } from "./Reveal";

const web = [siLaravel, siPhp, siLivewire, siNextdotjs, siReact, siTypescript, siTailwindcss, siFastapi, siPostgresql, siMysql, siSqlite, siDocker, siGit];
const vision = [siPython, siOpencv, siScikitlearn, siNumpy, siPandas, siJupyter, siLeaflet, siOllama];

// Curly bracket from the Skiper31 text-scroll component, kept as the row label's frame.
function Bracket({ className }: { className?: string }) {
  return (
    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
}

function Row({ label, icons }: { label: string; icons: SimpleIcon[] }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="flex items-center gap-3 text-lg font-medium tracking-tight text-fg-2 sm:text-xl">
        <Bracket className="h-9 text-muted" />
        {label}
        <Bracket className="h-9 -scale-x-100 text-muted" />
      </p>
      <ul className="flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-5 sm:gap-x-5">
        {icons.map((icon) => (
          <li key={icon.slug} className="flex w-[4.5rem] flex-col items-center gap-2">
            <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface sm:size-16">
              <svg aria-hidden viewBox="0 0 24 24" className="size-6 sm:size-7" fill="currentColor">
                <path d={icon.path} />
              </svg>
            </span>
            <span className="text-center text-xs leading-tight text-muted">{icon.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStack() {
  const { dict } = useContent();
  const t = dict.about.tech;

  return (
    <Reveal className="mt-16 flex flex-col items-center gap-14 py-6 md:mt-24 md:gap-16">
      <h3 className="text-center text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl md:text-7xl">{t.title}</h3>
      <Row label={t.web} icons={web} />
      <Row label={t.vision} icons={vision} />
      <p className="max-w-2xl text-center text-sm leading-relaxed text-muted">
        {t.also} {t.alsoItems}
      </p>
    </Reveal>
  );
}

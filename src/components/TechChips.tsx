import {
  siDocker,
  siDotnet,
  siFastapi,
  siJavascript,
  siJupyter,
  siLaravel,
  siLeaflet,
  siLivewire,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siOpencv,
  siPostgresql,
  siPython,
  siScikitlearn,
  siSqlite,
  siTailwindcss,
  type SimpleIcon,
} from "simple-icons";

// Stack names as written in content.ts, matched to their logo. Names left out have no logo in
// simple-icons and get a monogram instead, rather than a borrowed or invented mark.
const logos: Record<string, SimpleIcon> = {
  Python: siPython,
  OpenCV: siOpencv,
  FastAPI: siFastapi,
  SQLite: siSqlite,
  Docker: siDocker,
  "Next.js": siNextdotjs,
  Leaflet: siLeaflet,
  PostgreSQL: siPostgresql,
  Ollama: siOllama,
  "Laravel 11": siLaravel,
  "Livewire 3": siLivewire,
  "Tailwind CSS": siTailwindcss,
  "scikit-learn": siScikitlearn,
  Jupyter: siJupyter,
  ".NET 8": siDotnet,
  "Node.js": siNodedotjs,
  JavaScript: siJavascript,
};

function Mark({ name }: { name: string }) {
  const logo = logos[name];
  if (logo) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="currentColor">
        <path d={logo.path} />
      </svg>
    );
  }
  return (
    <span aria-hidden className="grid size-3.5 shrink-0 place-items-center rounded-[4px] bg-muted/25 text-[9px] font-bold leading-none">
      {name.startsWith("C#") ? "#" : name[0].toUpperCase()}
    </span>
  );
}

/** A project's stack as small chips: logo (or monogram) and name. */
export function TechChips({ stack, className = "" }: { stack: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {stack.map((name) => (
        <li
          key={name}
          className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-surface-2/60 px-2.5 text-xs font-medium text-fg-2"
        >
          <Mark name={name} />
          {name}
        </li>
      ))}
    </ul>
  );
}

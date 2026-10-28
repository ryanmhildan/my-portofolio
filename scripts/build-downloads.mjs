// Prints the portfolio deck to public/downloads with headless Chrome (or Edge).
// Start the site first (npm run build && npm start, or npm run dev), then: npm run downloads
// Optional: BASE_URL=http://localhost:3001 npm run downloads
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = resolve("public/downloads");

const browsers = [
  process.env.BROWSER,
  // Chrome first: a running Edge swallows the headless launch and no PDF is written.
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = browsers.find((b) => existsSync(b));
if (!browser) throw new Error("No Chrome or Edge found. Set BROWSER to its path.");
// A throwaway profile keeps the headless run apart from any browser window already open.
const profile = mkdtempSync(join(tmpdir(), "pdf-profile-"));

const jobs = [
  ["/id/print/portfolio", "Portofolio-Ryan-Hildan.pdf"],
  ["/en/print/portfolio", "Portfolio-Ryan-Hildan.pdf"],
];

mkdirSync(out, { recursive: true });
for (const [path, file] of jobs) {
  const target = resolve(out, file);
  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--user-data-dir=${profile}`,
    "--force-color-profile=srgb",
    "--blink-settings=preferredColorScheme=1",
    "--virtual-time-budget=15000",
    `--print-to-pdf=${target}`,
    base + path,
  ], { stdio: "ignore" });
  console.log(`${file}  ${Math.round(statSync(target).size / 1024)} KB`);
}
rmSync(profile, { recursive: true, force: true });

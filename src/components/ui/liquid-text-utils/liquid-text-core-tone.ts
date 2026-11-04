import { useTheme } from "@/components/Header";
import type { BjorkTone } from "./liquid-text-core-palette";

/** An explicit tone wins; otherwise the type follows the site theme. */
export function useBjorkTone(tone?: BjorkTone): BjorkTone {
  const theme = useTheme();
  return tone ?? (theme === "dark" ? "dark" : "light");
}

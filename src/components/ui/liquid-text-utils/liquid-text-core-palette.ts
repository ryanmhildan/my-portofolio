export type BjorkTone = "light" | "dark";

// Canvas colours cannot read CSS variables, so these repeat --fg from globals.css.
export const BJORK_PALETTE: Record<BjorkTone, { text: string }> = {
  light: { text: "#0a0a0a" },
  dark: { text: "#f2f2f2" },
};

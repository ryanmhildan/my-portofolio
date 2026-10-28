"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useMemo } from "react";
import { getContent, type Lang } from "@/data/content";

const LangContext = createContext<Lang>("id");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <LangContext.Provider value={lang}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useContent() {
  const lang = useLang();
  return useMemo(() => getContent(lang), [lang]);
}

"use client";

import { motion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p";
  /** Marks the element as a liquid card (see LiquidSurfaces). */
  liquid?: boolean;
};

export function Reveal({ children, delay = 0, y = 24, className, as = "div", liquid = false }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      data-liquid={liquid ? "card" : undefined}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}

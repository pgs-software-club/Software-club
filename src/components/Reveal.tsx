"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay — use small increments to stagger a row of cards. */
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

const offsets = {
  up: { y: 24, x: 0 },
  left: { y: 0, x: -24 },
  right: { y: 0, x: 24 },
  none: { y: 0, x: 0 },
};

/**
 * Fades content in as it scrolls into view, once. Replaces the mount-time
 * animations that used to fire while the section was still off-screen.
 */
export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

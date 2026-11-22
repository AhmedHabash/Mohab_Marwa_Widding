"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // seconds to wait before the animation starts
  direction?: "up" | "down" | "none"; // where the element comes from
  distance?: number; // how far (in px) the element travels
  duration?: number; // animation length in seconds
};

// Wraps any content and fades it in smoothly when it enters the screen.
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.9,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // Guests who prefer less motion see the content immediately, no animation.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsetY =
    direction === "up" ? distance : direction === "down" ? -distance : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

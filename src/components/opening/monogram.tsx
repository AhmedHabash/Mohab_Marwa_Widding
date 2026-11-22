"use client";

import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

type MonogramProps = {
  className?: string;
  animated?: boolean; // draw the ring and fade in the letters
  tone?: "light" | "dark"; // "dark" is for dark backgrounds
};

const EASE = [0.22, 1, 0.36, 1] as const;

// The couple's monogram: إ & م inside a fine double ring.
// The size is controlled by the parent, e.g. className="w-40".
export function Monogram({
  className,
  animated = true,
  tone = "light",
}: MonogramProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  const { groom, bride } = weddingConfig;
  const isDark = tone === "dark";
  const letterFill = isDark ? "fill-ivory" : "fill-burgundy";

  // Props for the ring: it "draws itself" from nothing to a full circle.
  const ringMotion = shouldAnimate
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.8, ease: EASE },
      }
    : {};

  // Props for everything else: fades in and rises slightly after a delay.
  const fadeIn = (delay: number) =>
    shouldAnimate
      ? {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }
      : {};

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      role="img"
      aria-label={`${groom.nameAr} و${bride.nameAr}`}
      className={cn("mx-auto h-auto w-40 text-gold", className)}
    >
      {/* Rings: rotated so the drawing starts from the top */}
      <g transform="rotate(-90 100 100)">
        <motion.circle
          cx="100"
          cy="100"
          r="94"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          {...ringMotion}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="88"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.6"
          {...ringMotion}
        />
      </g>

      {/* Small diamond at the top */}
      <motion.path
        d="M100 32L105 39L100 46L95 39Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        {...fadeIn(1.2)}
      />

      {/* Letters. In RTL the groom's initial sits on the right. */}
      <motion.g {...fadeIn(0.6)}>
        <text
          x="142"
          y="120"
          textAnchor="middle"
          fontSize="76"
          className={letterFill}
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {groom.initialAr}
        </text>

        <text
          x="68"
          y="120"
          textAnchor="middle"
          fontSize="76"
          className={letterFill}
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {bride.initialAr}
        </text>
      </motion.g>

      {/* Ampersand between the two letters */}
      <motion.text
        x="112"
        y="122"
        textAnchor="middle"
        fontSize="30"
        className="fill-gold"
        style={{ fontFamily: "var(--font-latin), serif" }}
        {...fadeIn(1)}
      >
        &amp;
      </motion.text>

      {/* Small ornament at the bottom */}
      <motion.g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...fadeIn(1.3)}
      >
        <path d="M72 154H93M107 154H128" />
        <circle cx="100" cy="154" r="1.6" fill="currentColor" stroke="none" />
      </motion.g>
    </svg>
  );
}

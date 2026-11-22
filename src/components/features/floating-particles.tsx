"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  id: number;
  left: number; // % from the left edge of the parent
  top: number; // % from the top edge of the parent
  size: number; // px
  duration: number; // seconds for one full cycle
  delay: number; // seconds before the first cycle
  driftX: number; // px moved sideways during a cycle
  driftY: number; // px moved upward during a cycle
  rotate: number; // degrees turned during a cycle
  tone: string; // Tailwind background class
  isPetal: boolean; // petal shape or round speck
};

// Small seeded random generator. Unlike Math.random(), it gives the SAME
// numbers on the server and in the browser, which avoids hydration errors.
function createRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TONES = ["bg-rose-soft", "bg-rose/50", "bg-gold/50", "bg-sage/40"];

function createParticles(count: number): Particle[] {
  const random = createRandom(2026);
  const between = (min: number, max: number) =>
    Number((min + random() * (max - min)).toFixed(2));

  return Array.from({ length: count }, (_, id) => ({
    id,
    left: between(3, 97),
    top: between(8, 92),
    size: between(5, 12),
    duration: between(9, 17),
    delay: between(0, 8),
    driftX: between(-40, 40),
    driftY: between(50, 130),
    rotate: between(-120, 120),
    tone: TONES[Math.floor(random() * TONES.length)],
    isPetal: random() > 0.4,
  }));
}

// Generated once, when the file loads. Never changes between renders.
const PARTICLES = createParticles(16);

type FloatingParticlesProps = {
  className?: string;
};

// Soft floating petals and specks. Place it inside a parent that has
// the "relative" class; it fills the parent without blocking clicks.
export function FloatingParticles({ className }: FloatingParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  // Guests who prefer less motion get a calm, still background.
  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className={cn(
            "absolute block will-change-transform",
            p.tone,
            // On small screens only the first 8 particles are shown
            p.id >= 8 && "hidden sm:block",
          )}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: p.isPetal ? "100% 0 100% 0" : "9999px",
            opacity: 0,
          }}
          animate={{
            x: [0, p.driftX / 2, p.driftX],
            y: [0, -p.driftY / 2, -p.driftY],
            rotate: [0, p.rotate / 2, p.rotate],
            opacity: [0, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </div>
  );
}

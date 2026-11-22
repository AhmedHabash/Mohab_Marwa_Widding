"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { FloatingParticles } from "@/components/features/floating-particles";
import { Monogram } from "@/components/opening/monogram";
import { FloralCorner } from "@/components/ui/floral-corner";
import { OrnamentDivider } from "@/components/ui/ornament-divider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Small line above the names. Change it here if you want other wording.
const EYEBROW = "يتشرف بدعوتكم لحضور حفل زفافهما";

// The container only orchestrates: it makes its children appear one by one.
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

// Every direct child fades in and rises slightly.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

type HeroSectionProps = {
  // false while the envelope intro covers the page; true once it opens.
  // This keeps the entrance animation from playing behind the envelope.
  ready?: boolean;
};

export function HeroSection({ ready = true }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isActive = Boolean(prefersReducedMotion) || ready;

  const { groom, bride, date, venue, invitation } = weddingConfig;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-24 text-center"
    >
      {/* Soft glow behind the names */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-soft/40 blur-3xl sm:size-[36rem]"
      />

      {/* Atmosphere */}
      <FloatingParticles />
      <FloralCorner position="top-left" className="text-rose/60" />
      <FloralCorner position="top-right" className="text-rose/60" />
      <FloralCorner position="bottom-left" className="text-rose/60" />
      <FloralCorner position="bottom-right" className="text-rose/60" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isActive ? "visible" : "hidden"}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center"
      >
        {/* The monogram draws itself only once the section is active */}
        <motion.div variants={itemVariants} className="size-32 sm:size-40">
          {isActive && <Monogram className="w-full" />}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 font-text text-lg text-sage-deep sm:text-xl"
        >
          {EYEBROW}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mt-4 font-script leading-[1.3] text-burgundy"
        >
          <span className="block text-6xl sm:text-7xl md:text-8xl">
            {groom.nameAr}
          </span>
          <span className="block font-roman text-4xl text-gold sm:text-5xl">
            &amp;
          </span>
          <span className="block text-6xl sm:text-7xl md:text-8xl">
            {bride.nameAr}
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="w-full">
          <OrnamentDivider className="my-6" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-balance font-text text-xl text-ink-soft sm:text-2xl"
        >
          {invitation.heroPhrase}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <p className="flex items-center gap-2.5 font-text text-xl text-burgundy sm:text-2xl">
            <CalendarDays
              size={22}
              strokeWidth={1.5}
              className="text-gold"
              aria-hidden="true"
            />
            <span>
              {date.weekdayAr} {date.dayLabel} {date.monthAr} {date.year}
            </span>
          </p>

          {/* dir="ltr" keeps the numbers in the order 10 / 12 / 2026 */}
          <p
            dir="ltr"
            className="font-roman text-lg tracking-[0.2em] text-ink-soft"
          >
            {date.numeric}
          </p>

          <p className="flex items-center gap-2.5 font-script text-2xl text-burgundy sm:text-3xl">
            <MapPin
              size={22}
              strokeWidth={1.5}
              className="text-gold"
              aria-hidden="true"
            />
            <span>{venue.nameAr}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue: links to the countdown section */}
      <motion.a
        href="#countdown"
        aria-label="انتقل إلى الأسفل"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.8, delay: isActive ? 2.2 : 0 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold"
      >
        <ChevronDown
          size={28}
          strokeWidth={1.4}
          className="motion-safe:animate-bounce"
        />
      </motion.a>
    </section>
  );
}

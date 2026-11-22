"use client";

import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { useCountdown } from "@/hooks/use-countdown";
import { FloatingParticles } from "@/components/features/floating-particles";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

// Arabic-Indic digits (٠١٢٣...) with at least two digits: ٠٥, ٤٢, ١٢٠
const numberFormat = new Intl.NumberFormat("ar-EG", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

type UnitProps = {
  value: number;
  label: string;
  isReady: boolean;
};

// One box of the countdown: a big number and its label.
function CountdownUnit({ value, label, isReady }: UnitProps) {
  const prefersReducedMotion = useReducedMotion();

  // Before the first calculation in the browser, show a quiet placeholder.
  const text = isReady ? numberFormat.format(value) : "٠٠";

  return (
    <div className="flex flex-col items-center rounded-2xl border border-rose/25 bg-burgundy-deep/60 px-1 py-5 sm:py-7">
      <div className="relative h-14 w-full overflow-hidden text-center sm:h-20">
        {/* "key" makes React replace the element when the number changes,
            so each new number glides in from above. */}
        <motion.span
          key={text}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: isReady ? 1 : 0.35, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block font-text text-5xl leading-[3.5rem] text-ivory tabular-nums sm:text-7xl sm:leading-[5rem]"
        >
          {text}
        </motion.span>
      </div>
      <span className="mt-2 font-text text-base text-rose-soft sm:text-lg">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { date } = weddingConfig;
  const { timeLeft, isFinished, isReady } = useCountdown(date.dateTimeISO);

  return (
    <section
      id="countdown"
      className="relative isolate overflow-hidden bg-burgundy px-4 py-24 sm:py-32"
    >
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading
          tone="dark"
          eyebrow="موعدنا"
          title="العدّ التنازلي"
          subtitle={
            isFinished
              ? undefined
              : "كل لحظة تقرّبنا من الليلة التي ننتظرها بكل شوق"
          }
        />

        <Reveal className="mt-12 sm:mt-16" delay={0.2}>
          {isFinished ? (
            <p className="text-balance text-center font-script text-4xl leading-snug text-ivory sm:text-5xl">
              حان الموعد، واليوم يوم فرحتنا
            </p>
          ) : (
            // role="timer" lets screen readers treat this as a clock
            // without announcing every single second.
            <div
              role="timer"
              aria-label="الوقت المتبقي على حفل الزفاف"
              className="grid grid-cols-4 gap-2 sm:gap-5"
            >
              <CountdownUnit
                value={timeLeft.days}
                label="يوم"
                isReady={isReady}
              />
              <CountdownUnit
                value={timeLeft.hours}
                label="ساعة"
                isReady={isReady}
              />
              <CountdownUnit
                value={timeLeft.minutes}
                label="دقيقة"
                isReady={isReady}
              />
              <CountdownUnit
                value={timeLeft.seconds}
                label="ثانية"
                isReady={isReady}
              />
            </div>
          )}
        </Reveal>

        <Reveal className="mt-10 text-center" delay={0.3}>
          <p className="font-text text-lg text-rose-soft">
            {date.weekdayAr} {date.dayLabel} {date.monthAr} {date.year}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

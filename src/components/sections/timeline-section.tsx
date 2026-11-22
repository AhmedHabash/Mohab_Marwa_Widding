import {
  Camera,
  DoorOpen,
  Heart,
  Music,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TimelineIcon } from "@/types/wedding";

// Connects each icon key from wedding.ts to a real Lucide icon.
// Record<TimelineIcon, ...> makes TypeScript complain if we ever add
// a new key to the type and forget to map it here.
const ICONS: Record<TimelineIcon, LucideIcon> = {
  arrival: DoorOpen,
  ceremony: Heart,
  photos: Camera,
  dinner: UtensilsCrossed,
  dance: Music,
};

export function TimelineSection() {
  const { timeline } = weddingConfig;

  // No events means no section at all (no empty heading on the page).
  if (timeline.length === 0) return null;

  return (
    <section id="timeline" className="relative bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="برنامج الليلة"
          title="سهرة العمر"
          subtitle="هكذا نقضي معكم أجمل ساعات الليلة"
        />

        <ol className="relative mt-14 space-y-10 sm:mt-16 sm:space-y-12">
          {/* The vertical line, passing through the center of every circle.
              It starts and ends at the centers of the first and last circles. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 top-6 w-px bg-gold/40 start-[calc(1.5rem-0.5px)]"
          />

          {timeline.map((event, index) => {
            const Icon = ICONS[event.icon];

            return (
              <li key={event.id}>
                <Reveal delay={index === 0 ? 0 : 0.05} className="flex gap-5">
                  {/* Circle with icon (its background hides the line behind it) */}
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ivory text-burgundy">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <p className="font-text text-lg text-sage-deep">
                      {event.time}
                    </p>
                    <h3 className="mt-0.5 font-script text-2xl leading-snug text-burgundy sm:text-3xl">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-pretty font-text text-lg leading-relaxed text-ink-soft">
                      {event.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

import { MapPin, Navigation } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { Button } from "@/components/ui/button";
import { FloralCorner } from "@/components/ui/floral-corner";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function VenueSection() {
  const { venue, date } = weddingConfig;

  return (
    <section
      id="venue"
      className="relative isolate overflow-hidden bg-burgundy px-6 py-24 sm:py-32"
    >
      <FloralCorner position="top-left" className="text-rose/40" />
      <FloralCorner position="bottom-right" className="text-rose/40" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionHeading
          tone="dark"
          eyebrow="المكان"
          title="في انتظاركم"
          subtitle="يسعدنا أن نلتقي بكم في قاعتنا المميزة"
        />

        <Reveal className="mt-12 sm:mt-16" delay={0.15}>
          <div className="relative mx-auto flex max-w-md flex-col items-center rounded-3xl border border-rose/25 bg-burgundy-deep/60 px-8 py-10 text-center sm:px-12 sm:py-12">
            {/* Pin inside a circle, with a soft pulse behind it */}
            <div className="relative mb-6 flex size-20 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-rose/20 motion-safe:animate-ping [animation-duration:3s]"
              />
              <span className="relative flex size-20 items-center justify-center rounded-full border border-gold/50 bg-burgundy text-ivory">
                <MapPin size={30} strokeWidth={1.4} aria-hidden="true" />
              </span>
            </div>

            <h3 className="font-script text-4xl leading-snug text-ivory sm:text-5xl">
              {venue.nameAr}
            </h3>

            <p className="mt-3 font-text text-lg text-rose-soft sm:text-xl">
              {date.weekdayAr} {date.dayLabel} {date.monthAr} {date.year}
            </p>

            {venue.mapsUrl ? (
              <Button
                href={venue.mapsUrl}
                external
                variant="light"
                className="mt-8"
                icon={<Navigation size={20} strokeWidth={1.6} />}
                aria-label={`افتح موقع ${venue.nameAr} على خرائط جوجل`}
              >
                افتح الموقع على الخريطة
              </Button>
            ) : (
              <p className="mt-8 font-text text-base text-rose-soft/80">
                سيتم إضافة رابط الموقع قريباً
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

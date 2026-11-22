import { weddingConfig } from "@/config/wedding";
import { FloralCorner } from "@/components/ui/floral-corner";
import { OrnamentDivider } from "@/components/ui/ornament-divider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function InvitationSection() {
  const { groom, bride, invitation } = weddingConfig;

  return (
    <section
      id="invitation"
      className="relative isolate overflow-hidden bg-cream px-6 py-24 sm:py-32"
    >
      {/* Two corners on opposite diagonals, so it feels different from the hero */}
      <FloralCorner position="top-right" className="text-rose/50" />
      <FloralCorner position="bottom-left" className="text-rose/50" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionHeading eyebrow="دعوة" title={invitation.invitationTitle} />

        <div className="mt-12 space-y-8 text-center sm:mt-16">
          {invitation.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.1}>
              <p className="text-pretty font-text text-xl leading-loose text-ink sm:text-2xl sm:leading-loose">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Signature */}
        <Reveal className="mt-16 text-center" delay={0.1}>
          <OrnamentDivider className="mb-8" />
          <p className="font-text text-lg text-sage-deep">مع خالص المحبة</p>
          <p className="mt-3 font-script text-4xl leading-snug text-burgundy sm:text-5xl">
            {groom.nameAr}{" "}
            <span className="font-roman text-3xl text-gold sm:text-4xl">
              &amp;
            </span>{" "}
            {bride.nameAr}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

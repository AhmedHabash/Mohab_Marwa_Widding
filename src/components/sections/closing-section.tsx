import { weddingConfig } from "@/config/wedding";
import { WhatsAppShareButton } from "@/components/features/whatsapp-share-button";
import { Monogram } from "@/components/opening/monogram";
import { FloatingParticles } from "@/components/features/floating-particles";
import { FloralCorner } from "@/components/ui/floral-corner";
import { OrnamentDivider } from "@/components/ui/ornament-divider";
import { Reveal } from "@/components/ui/reveal";

export function ClosingSection() {
  const { groom, bride, date, invitation, credit } = weddingConfig;

  return (
    <section
      id="closing"
      className="relative isolate overflow-hidden bg-ivory px-6 pb-16 pt-24 text-center sm:pt-32"
    >
      {/* Soft glow behind the monogram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] -z-10 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-soft/40 blur-3xl sm:size-[30rem]"
      />

      <FloatingParticles />
      <FloralCorner position="bottom-left" className="text-rose/60" />
      <FloralCorner position="bottom-right" className="text-rose/60" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        {/* Static monogram: this section is far down the page, so a
            draw-on-load animation would finish before anyone sees it. */}
        <Reveal>
          <Monogram animated={false} className="w-32 sm:w-36" />
        </Reveal>

        <Reveal delay={0.1}>
          <OrnamentDivider className="my-8" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-balance font-script text-3xl leading-[1.6] text-burgundy sm:text-4xl sm:leading-[1.6]">
            {invitation.closingMessage}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <p className="font-text text-lg text-sage-deep">بكل الحب</p>
          <p className="mt-2 font-script text-4xl leading-snug text-burgundy sm:text-5xl">
            {groom.nameAr}{" "}
            <span className="font-roman text-3xl text-gold sm:text-4xl">
              &amp;
            </span>{" "}
            {bride.nameAr}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-12">
          <p className="mb-5 font-text text-lg text-ink-soft">
            شاركوا الفرحة مع من تحبون
          </p>
          <WhatsAppShareButton variant="solid" />
        </Reveal>

        {/* Quiet footer: the date, then the design credit */}
        <Reveal delay={0.3} className="mt-16">
          <p
            dir="ltr"
            className="font-roman text-base tracking-[0.25em] text-ink-soft/80"
          >
            {date.numeric}
          </p>
        </Reveal>

        {/* Credit line. Rendered only if the details exist in the config,
            and with enough bottom space to stay clear of the music button. */}
        {credit.name && (
          <Reveal delay={0.35} className="mb-6 mt-8">
            <OrnamentDivider className="mb-5 w-40 opacity-70" />
            <p className="font-text text-base text-ink-soft">{credit.label}</p>
            <p className="mt-1 font-text text-lg text-burgundy">
              <span className="font-bold">{credit.name}</span>
              {credit.relation && (
                <span className="text-ink-soft">، {credit.relation}</span>
              )}
            </p>

            {/* Social links: plain text separated by small gold dots */}
            {credit.links.length > 0 && (
              <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                {credit.links.map((link, index) => (
                  <li key={link.id} className="flex items-center gap-3">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-gold/60"
                      />
                    )}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label}: ${credit.name}`}
                      className="px-1 py-1.5 font-text text-base text-burgundy underline-offset-4 transition-colors hover:text-rose hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}

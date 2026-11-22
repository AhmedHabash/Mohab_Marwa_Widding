import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { OrnamentDivider } from "@/components/ui/ornament-divider";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string; // small line above the title
  subtitle?: string; // supporting text below the ornament
  tone?: "light" | "dark"; // "dark" is for sections with a dark background
  className?: string;
};

// The shared heading for every section of the invitation.
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <header className={cn("mx-auto max-w-2xl px-6 text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "mb-3 font-text text-base",
              isDark ? "text-rose-soft" : "text-sage-deep",
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <h2
          className={cn(
            "font-script text-4xl leading-snug sm:text-5xl",
            isDark ? "text-ivory" : "text-burgundy",
          )}
        >
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <OrnamentDivider
          className={cn("mt-5", isDark ? "text-rose" : "text-gold")}
        />
      </Reveal>

      {subtitle && (
        <Reveal delay={0.3}>
          <p
            className={cn(
              "mt-5 font-text text-lg sm:text-xl",
              isDark ? "text-rose-soft" : "text-ink-soft",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </header>
  );
}

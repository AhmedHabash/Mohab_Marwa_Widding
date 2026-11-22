import { cn } from "@/lib/utils";

type OrnamentDividerProps = {
  className?: string;
};

// A fine, symmetrical ornament used to separate sections.
// It draws with "currentColor", so its color is controlled by a
// Tailwind text class, e.g. className="text-gold" or "text-rose".
export function OrnamentDivider({ className }: OrnamentDividerProps) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      aria-hidden="true"
      className={cn("mx-auto h-6 w-60 text-gold", className)}
    >
      {/* Side lines */}
      <path
        d="M10 12H78M162 12H230"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Leaves */}
      <path
        d="M98 12C92 7 86 7 82 10C86 13 92 13 98 12Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M142 12C148 7 154 7 158 10C154 13 148 13 142 12Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Small dots next to the center */}
      <circle cx="104" cy="12" r="1.5" fill="currentColor" />
      <circle cx="136" cy="12" r="1.5" fill="currentColor" />

      {/* Center diamond */}
      <path
        d="M120 5L127 12L120 19L113 12Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

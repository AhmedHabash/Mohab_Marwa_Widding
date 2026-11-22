import { cn } from "@/lib/utils";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type FloralCornerProps = {
  position?: Corner;
  className?: string;
};

// A single leaf shape that points to the right, 22 units long.
const LEAF = "M0 0C6 -7 16 -7 22 0C16 7 6 7 0 0Z";

// Where each corner sits, and how to flip the drawing so that it
// always points toward the inside of the section.
const cornerStyles: Record<Corner, string> = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0 -scale-x-100",
  "bottom-left": "bottom-0 left-0 -scale-y-100",
  "bottom-right": "bottom-0 right-0 -scale-100",
};

// One branch: a curved stem with pairs of leaves and a small bud at the tip.
function Branch() {
  return (
    <g>
      <path
        d="M30 30C60 14 100 12 150 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <g
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <g transform="translate(65 18)">
          <path d={LEAF} transform="rotate(-40)" />
          <path d={LEAF} transform="rotate(40)" />
        </g>
        <g transform="translate(101 15)">
          <path d={LEAF} transform="rotate(-38)" />
          <path d={LEAF} transform="rotate(38)" />
        </g>
        <g transform="translate(135 18) scale(0.8)">
          <path d={LEAF} transform="rotate(-30)" />
          <path d={LEAF} transform="rotate(30)" />
        </g>
      </g>

      <circle cx="150" cy="20" r="1.8" fill="currentColor" />
    </g>
  );
}

// A decorative floral corner. Place it inside a parent that has
// the "relative" class. Its color follows the text color, e.g.
// className="text-rose" or "text-sage".
export function FloralCorner({
  position = "top-left",
  className,
}: FloralCornerProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-28 w-28 select-none text-rose opacity-70 sm:h-40 sm:w-40",
        cornerStyles[position],
        className,
      )}
    >
      {/* Branch along the top edge */}
      <Branch />

      {/* The same branch mirrored across the diagonal: runs along the side edge */}
      <g transform="matrix(0 1 1 0 0 0)">
        <Branch />
      </g>

      {/* Flower in the corner: five petals around a center */}
      <g
        transform="translate(30 30)"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1"
      >
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-9"
            rx="4.5"
            ry="9"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="3" fill="currentColor" fillOpacity="1" stroke="none" />
      </g>
    </svg>
  );
}

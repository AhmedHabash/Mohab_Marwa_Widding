import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline" | "light";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode; // optional icon shown before the label
  href?: string; // if provided, the button renders as a link
  external?: boolean; // opens the link in a new tab
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3 " +
  "font-text text-lg leading-none transition-all duration-300 " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  // Filled burgundy: the main action
  solid: "bg-burgundy text-ivory shadow-sm hover:bg-burgundy-deep",
  // Thin outline: a quieter secondary action
  outline:
    "border border-burgundy/40 text-burgundy hover:bg-burgundy hover:text-ivory",
  // Ivory button: for sections with a dark background
  light: "bg-ivory text-burgundy hover:bg-rose-soft",
};

// One button style for the whole site. It renders an <a> when an href
// is given (e.g. the Google Maps link), and a <button> otherwise.
export function Button({
  children,
  variant = "solid",
  icon,
  href,
  external = false,
  onClick,
  disabled,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

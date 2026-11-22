import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines class names conditionally and resolves Tailwind conflicts.
// Example: cn("px-4", isActive && "bg-rose", "px-6") => "bg-rose px-6"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

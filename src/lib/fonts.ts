import { Amiri, Aref_Ruqaa, Cormorant_Garamond } from "next/font/google";

// Display font: calligraphic Arabic (Ruqaa style).
// Used for the couple's names and the main decorative headings.
export const fontDisplay = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body font: classic, editorial Arabic (Naskh style).
// Used for invitation paragraphs and general text.
export const fontBody = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

// Latin serif: used for the monogram, English initials and numerals.
export const fontLatin = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-latin",
  display: "swap",
});

// All font CSS variables in one string, so layout.tsx can apply them
// to the <html> element with a single className.
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontLatin.variable,
].join(" ");

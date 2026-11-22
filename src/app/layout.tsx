import type { Metadata, Viewport } from "next";
import { weddingConfig } from "@/config/wedding";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const { groom, bride, date, venue } = weddingConfig;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `دعوة زفاف ${groom.nameAr} و${bride.nameAr}`;
const description = `${date.weekdayAr} ${date.dayLabel} ${date.monthAr} ${date.year} - ${venue.nameAr}`;

// Controls how the link looks in browser tabs and when it is shared
// on WhatsApp, Facebook, etc.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ar_EG",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

// Mobile-first viewport settings.
// viewportFit "cover" lets the design extend behind phone notches.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf6ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}

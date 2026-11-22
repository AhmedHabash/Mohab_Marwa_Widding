import type { Metadata } from "next";
import { Home } from "lucide-react";
import { Monogram } from "@/components/opening/monogram";
import { Button } from "@/components/ui/button";
import { OrnamentDivider } from "@/components/ui/ornament-divider";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
};

// Shown automatically by Next.js whenever a URL does not exist.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ivory px-6 py-16 text-center">
      <Monogram className="w-28 sm:w-32" />

      <OrnamentDivider className="my-8" />

      <h1 className="font-script text-4xl leading-snug text-burgundy sm:text-5xl">
        هذه الصفحة غير موجودة
      </h1>

      <p className="mt-4 max-w-md text-balance font-text text-xl text-ink-soft">
        يبدو أن الرابط غير صحيح، لكن دعوتنا في انتظاركم.
      </p>

      <Button
        href="/"
        variant="solid"
        className="mt-10"
        icon={<Home size={20} strokeWidth={1.6} />}
      >
        العودة إلى الدعوة
      </Button>
    </main>
  );
}

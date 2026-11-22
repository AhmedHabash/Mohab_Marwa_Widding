"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/config/wedding";
import { buildWhatsAppShareUrl } from "@/lib/whatsapp";

type WhatsAppShareButtonProps = {
  variant?: "solid" | "outline" | "light";
  className?: string;
};

// Opens WhatsApp with the invitation message and the website link ready to send.
export function WhatsAppShareButton({
  variant = "solid",
  className,
}: WhatsAppShareButtonProps) {
  const handleShare = () => {
    try {
      // The address is read at click time, so it works on localhost
      // now and on the real domain after publishing.
      // Hash and query strings are dropped to keep the shared link clean.
      const pageUrl = `${window.location.origin}${window.location.pathname}`;

      const shareUrl = buildWhatsAppShareUrl({
        message: weddingConfig.share.message,
        url: pageUrl,
      });

      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("WhatsAppShareButton: could not open WhatsApp", error);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleShare}
      icon={<MessageCircle size={20} strokeWidth={1.6} />}
    >
      شاركها على واتساب
    </Button>
  );
}



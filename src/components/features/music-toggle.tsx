"use client";

import { Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

type MusicToggleProps = {
  isPlaying: boolean;
  hasError: boolean;
  onToggle: () => void;
  className?: string;
};

// A floating button that pauses or resumes the background music.
// The audio itself is controlled by the page (see page.tsx), so the music
// can start automatically when the guest opens the envelope.
export function MusicToggle({
  isPlaying,
  hasError,
  onToggle,
  className,
}: MusicToggleProps) {
  // Hidden when music is turned off in the config, or if the audio file
  // is missing or fails to play, instead of showing a control that does nothing.
  if (!weddingConfig.music.enabled || hasError) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-40",
        "flex size-12 items-center justify-center rounded-full",
        "border border-gold/40 bg-ivory/90 text-burgundy shadow-md backdrop-blur-sm",
        "transition-all duration-300 hover:bg-rose-soft active:scale-95",
        className,
      )}
    >
      {/* A soft pulse shows while the music is paused */}
      {!isPlaying && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-burgundy/20 motion-safe:animate-ping"
        />
      )}

      {isPlaying ? (
        <Volume2 size={20} strokeWidth={1.6} className="relative" />
      ) : (
        <VolumeX size={20} strokeWidth={1.6} className="relative" />
      )}
    </button>
  );
}

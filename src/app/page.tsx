"use client";

import { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { useAudio } from "@/hooks/use-audio";
import { EnvelopeIntro } from "@/components/opening/envelope-intro";
import { MusicToggle } from "@/components/features/music-toggle";
import { HeroSection } from "@/components/sections/hero-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { InvitationSection } from "@/components/sections/invitation-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { VenueSection } from "@/components/sections/venue-section";
import { ClosingSection } from "@/components/sections/closing-section";

export default function HomePage() {
  // Becomes true when the envelope starts to fade away.
  // The hero uses it to begin its entrance animation at the right moment.
  const [isOpened, setIsOpened] = useState(false);

  // One audio controller for the whole page, shared by the envelope and the button.
  const { isPlaying, hasError, play, toggle } = useAudio(
    weddingConfig.music.src,
  );

  // Runs the moment the guest taps the envelope or "open the invitation".
  const handleEnvelopeTap = () => {
    if (weddingConfig.music.enabled) void play();
  };

  return (
    <>
      <EnvelopeIntro
        onOpen={handleEnvelopeTap}
        onOpened={() => setIsOpened(true)}
      />

      <main>
        <HeroSection ready={isOpened} />
        <CountdownSection />
        <InvitationSection />
        <TimelineSection />
        <VenueSection />
        <ClosingSection />
      </main>

      <MusicToggle
        isPlaying={isPlaying}
        hasError={hasError}
        onToggle={toggle}
      />
    </>
  );
}

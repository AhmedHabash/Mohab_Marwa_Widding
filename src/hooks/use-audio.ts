"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseAudioOptions = {
  volume?: number; // 0 to 1
  loop?: boolean;
};

type UseAudioReturn = {
  isPlaying: boolean;
  hasError: boolean; // true if the audio file could not be loaded or played
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
};

// Controls a single background audio track from a file path,
// e.g. "/audio/wedding-music.mp3".
export function useAudio(
  src: string,
  { volume = 0.5, loop = true }: UseAudioOptions = {},
): UseAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Create the audio element once, in the browser only.
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    // "none" means nothing downloads until the guest taps play,
    // which saves mobile data and keeps the first load fast.
    audio.preload = "none";

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    // Pause the music when the guest leaves the tab or locks the phone.
    const handleVisibility = () => {
      if (document.hidden) audio.pause();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    document.addEventListener("visibilitychange", handleVisibility);

    audioRef.current = audio;

    // Cleanup: stop the sound and remove every listener.
    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      document.removeEventListener("visibilitychange", handleVisibility);
      audioRef.current = null;
    };
  }, [src, loop, volume]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setHasError(false);
      await audio.play();
    } catch (error) {
      // AbortError happens when pause() interrupts a play() that is still
      // loading. It is expected, so we ignore it.
      if (error instanceof DOMException && error.name === "AbortError") return;

      console.error("useAudio: could not play the audio", error);
      setHasError(true);
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void play();
    } else {
      audio.pause();
    }
  }, [play]);

  return { isPlaying, hasError, play, pause, toggle };
}

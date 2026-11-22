"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownState = {
  timeLeft: TimeLeft;
  isFinished: boolean; // true once the wedding time has arrived
  isReady: boolean; // true once the countdown has been calculated in the browser
};

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

// Pure function: converts the remaining milliseconds into days/hours/minutes/seconds.
function calculateTimeLeft(targetMs: number): TimeLeft {
  const diff = Math.max(targetMs - Date.now(), 0);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

// Counts down to a date given as an ISO string,
// e.g. "2026-12-10T19:00:00+02:00".
export function useCountdown(targetISO: string): CountdownState {
  const [state, setState] = useState<CountdownState>({
    timeLeft: ZERO,
    isFinished: false,
    isReady: false,
  });

  useEffect(() => {
    const targetMs = new Date(targetISO).getTime();

    // Error handling: an invalid date must not crash the page.
    if (Number.isNaN(targetMs)) {
      console.error(`useCountdown: invalid date "${targetISO}"`);
      return;
    }

    // Recalculates and stores the time left. Returns true when the countdown is over.
    const tick = (): boolean => {
      const isFinished = targetMs - Date.now() <= 0;
      setState({
        timeLeft: calculateTimeLeft(targetMs),
        isFinished,
        isReady: true,
      });
      return isFinished;
    };

    // First calculation right after mounting, then once every second.
    const first = setTimeout(tick, 0);
    const interval = setInterval(() => {
      if (tick()) clearInterval(interval);
    }, 1000);

    // Cleanup: stop the timers when the component disappears.
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [targetISO]);

  return state;
}

'use client';

import { useEffect, useState } from 'react';

const SALE_DURATION_SECONDS = 8 * 60;

export function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useCountdown(initialSeconds: number = SALE_DURATION_SECONDS) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const isActive = secondsRemaining > 0;

  useEffect(() => {
    if (!isActive) return;

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isActive]);

  return {
    secondsRemaining,
    formattedTime: formatCountdown(secondsRemaining),
    isActive,
  };
}

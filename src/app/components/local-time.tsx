"use client";

import { useEffect, useState } from "react";

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

export function LocalTime({ initialTime }: { initialTime: string }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <time aria-label={`${time}, India Standard Time`}>{time} IST</time>;
}

"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-07-23T09:00:00"); // Standard ILCON start date

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center text-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col">
          <span className="text-4xl md:text-6xl font-bold text-blue-600">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-gray-500 uppercase text-xs md:text-sm tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
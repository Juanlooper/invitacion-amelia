import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate = '2026-11-21T20:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    días: 0,
    horas: 0,
    min: 0,
    seg: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          días: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          min: Math.floor((difference / 1000 / 60) % 60),
          seg: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ días: 0, horas: 0, min: 0, seg: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'DÍAS', value: timeLeft.días },
    { label: 'HORAS', value: timeLeft.horas },
    { label: 'MINUTOS', value: timeLeft.min },
    { label: 'SEGUNDOS', value: timeLeft.seg },
  ];

  return (
    <div className="w-full max-w-sm mx-auto px-2 py-4">
      <p className="text-center text-[10px] uppercase tracking-[0.25em] text-royal-800/80 font-cinzel font-semibold mb-3">
        Cuenta Regresiva
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {units.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-ice-200 shadow-md relative overflow-hidden"
          >
            <div className="text-2xl font-serif font-bold text-royal-900 leading-none">
              {String(unit.value).padStart(2, '0')}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-royal-700/80 font-medium mt-1">
              {unit.label}
            </span>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}


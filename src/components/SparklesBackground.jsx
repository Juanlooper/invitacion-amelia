import React, { useMemo } from 'react';

export default function SparklesBackground() {
  // Generate 50 randomized twinkling and drifting stars
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${(i * 19.3) % 100}%`,
      left: `${(i * 27.7) % 100}%`,
      size: i % 7 === 0 ? 'w-1.5 h-1.5' : i % 3 === 0 ? 'w-1 h-1' : 'w-0.5 h-0.5',
      twinkleDuration: `${2.5 + (i % 5) * 0.8}s`,
      twinkleDelay: `${(i * 0.4) % 4}s`,
      driftDuration: `${12 + (i % 7) * 2}s`,
      driftDelay: `${(i * 0.6) % 6}s`,
      opacity: 0.3 + (i % 6) * 0.12,
    }));
  }, []);

  // 4 Shooting stars with staggered trajectories and delays
  const shootingStars = [
    { id: 1, top: '12%', right: '15%', delay: '0s', duration: '1.2s', repeat: '6s' },
    { id: 2, top: '28%', right: '8%', delay: '2.5s', duration: '1.4s', repeat: '8s' },
    { id: 3, top: '45%', right: '22%', delay: '4.8s', duration: '1.1s', repeat: '7s' },
    { id: 4, top: '65%', right: '12%', delay: '1.8s', duration: '1.3s', repeat: '9s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#061224] via-[#091b36] to-[#040c18]">
      
      {/* Inline styles for high-performance GPU keyframes */}
      <style>{`
        @keyframes driftMove {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(8px, -12px);
          }
        }
        @keyframes starTwinkleGlow {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
        @keyframes shootTrajectory {
          0% {
            transform: rotate(-45deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(-45deg) translateX(-700px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Atmospheric ambient nebulas */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-b from-blue-400/10 via-sky-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Moving & Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            animation: `driftMove ${star.driftDuration} ease-in-out infinite alternate ${star.driftDelay}`,
          }}
        >
          <div
            className={`${star.size} rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.85)]`}
            style={{
              opacity: star.opacity,
              animation: `starTwinkleGlow ${star.twinkleDuration} ease-in-out infinite ${star.twinkleDelay}`,
            }}
          />
        </div>
      ))}

      {/* Shooting Stars (Estrellas Fugaces) */}
      {shootingStars.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute pointer-events-none"
          style={{
            top: meteor.top,
            right: meteor.right,
            width: '140px',
            height: '2px',
            background: 'linear-gradient(to left, rgba(255, 255, 255, 0.95), rgba(186, 224, 253, 0.6), transparent)',
            boxShadow: '0 0 10px 1px rgba(255, 255, 255, 0.8), 0 0 16px 2px rgba(124, 196, 250, 0.5)',
            transformOrigin: 'right center',
            animation: `shootTrajectory ${meteor.repeat} ease-in-out infinite ${meteor.delay}`,
            opacity: 0,
          }}
        >
          {/* Glowing head of the meteor */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_2px_#ffffff,0_0_16px_4px_#90cbfa]" />
        </div>
      ))}

    </div>
  );
}

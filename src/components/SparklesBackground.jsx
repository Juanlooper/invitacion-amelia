import React, { useMemo } from 'react';

export default function SparklesBackground() {
  // 22 lightweight static twinkling stars (Zero CPU/memory overhead)
  const stars = useMemo(() => {
    return [
      { id: 1, top: '8%', left: '15%', size: 'w-1 h-1', dur: '3.1s', delay: '0s' },
      { id: 2, top: '14%', left: '82%', size: 'w-1.5 h-1.5', dur: '4.2s', delay: '1.2s' },
      { id: 3, top: '24%', left: '35%', size: 'w-1 h-1', dur: '3.6s', delay: '2.4s' },
      { id: 4, top: '32%', left: '72%', size: 'w-1.5 h-1.5', dur: '4.8s', delay: '0.8s' },
      { id: 5, top: '42%', left: '18%', size: 'w-1 h-1', dur: '3.3s', delay: '1.9s' },
      { id: 6, top: '50%', left: '88%', size: 'w-1 h-1', dur: '4.5s', delay: '2.7s' },
      { id: 7, top: '58%', left: '28%', size: 'w-1.5 h-1.5', dur: '3.8s', delay: '0.4s' },
      { id: 8, top: '68%', left: '78%', size: 'w-1 h-1', dur: '4.1s', delay: '1.5s' },
      { id: 9, top: '76%', left: '12%', size: 'w-1 h-1', dur: '3.4s', delay: '2.8s' },
      { id: 10, top: '84%', left: '65%', size: 'w-1.5 h-1.5', dur: '4.6s', delay: '0.6s' },
      { id: 11, top: '92%', left: '32%', size: 'w-1 h-1', dur: '3.7s', delay: '1.8s' },
      { id: 12, top: '96%', left: '85%', size: 'w-1 h-1', dur: '4.0s', delay: '2.1s' },
      { id: 13, top: '18%', left: '6%', size: 'w-1 h-1', dur: '3.5s', delay: '1.0s' },
      { id: 14, top: '29%', left: '94%', size: 'w-1 h-1', dur: '4.3s', delay: '2.5s' },
      { id: 15, top: '47%', left: '52%', size: 'w-1 h-1', dur: '3.9s', delay: '0.3s' },
      { id: 16, top: '63%', left: '92%', size: 'w-1.5 h-1.5', dur: '4.7s', delay: '1.7s' },
      { id: 17, top: '79%', left: '42%', size: 'w-1 h-1', dur: '3.2s', delay: '2.2s' },
      { id: 18, top: '88%', left: '8%', size: 'w-1 h-1', dur: '4.4s', delay: '0.9s' },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#061224] via-[#091b36] to-[#040c18] transform-gpu">
      
      {/* GPU-accelerated lightweight CSS keyframes */}
      <style>{`
        @keyframes twinklePure {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.95; }
        }
        @keyframes shootFast {
          0% {
            transform: translate3d(0, 0, 0) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          65% {
            opacity: 1;
          }
          100% {
            transform: translate3d(-600px, 600px, 0) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Twinkling Stars (Pure Opacity - 60fps locked) */}
      {stars.map((s) => (
        <div
          key={s.id}
          className={`absolute ${s.size} rounded-full bg-white will-change-[opacity]`}
          style={{
            top: s.top,
            left: s.left,
            animation: `twinklePure ${s.dur} ease-in-out infinite ${s.delay}`,
          }}
        />
      ))}

      {/* Shooting Star 1 */}
      <div
        className="absolute pointer-events-none will-change-transform"
        style={{
          top: '16%',
          right: '10%',
          width: '120px',
          height: '1.5px',
          background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(162,210,255,0.6), transparent)',
          animation: 'shootFast 7s ease-out infinite 1s',
          opacity: 0,
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </div>

      {/* Shooting Star 2 */}
      <div
        className="absolute pointer-events-none will-change-transform"
        style={{
          top: '48%',
          right: '18%',
          width: '110px',
          height: '1.5px',
          background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(162,210,255,0.6), transparent)',
          animation: 'shootFast 9s ease-out infinite 4.5s',
          opacity: 0,
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </div>

    </div>
  );
}

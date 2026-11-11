import React from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

export default function HeroSection({ onOpenRsvp }) {
  return (
    <section className="relative w-full pt-6 pb-10 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Decorative frame mimic of the physical invitation */}
      <div className="w-full max-w-md mx-auto relative rounded-[32px] p-[1.5px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 shadow-2xl">
        <div className="relative rounded-[30px] bg-gradient-to-b from-[#eef7ff] via-[#d7ecff] to-[#c2e2fe] px-5 py-8 overflow-hidden border border-white/60">
          
          {/* Subtle Corner Lines */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-600/70" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-600/70" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-600/70" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-600/70" />

          {/* 15 with crown and laurel leaves */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center justify-center mb-1"
          >
            {/* Golden Crown */}
            <div className="w-16 h-11 mb-[-4px] relative z-10 flex items-center justify-center">
              <img src="/crown.png" alt="Corona" className="w-full h-full object-contain drop-shadow-md" />
            </div>

            <div className="flex items-baseline justify-center gap-2">
              <span className="font-cinzel text-6xl font-extrabold text-royal-900 tracking-tight drop-shadow-sm">
                15
              </span>
              <span className="font-serif italic text-3xl font-semibold text-royal-800">
                Años
              </span>
            </div>

            {/* Fine line divider */}
            <div className="flex items-center gap-2 my-1">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold-600/60" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold-600/80 bg-gold-400/40" />
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold-600/60" />
            </div>
          </motion.div>

          {/* Name: Amelia in sweeping calligraphy script */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-script text-6xl md:text-7xl text-royal-900 my-1 py-1 drop-shadow-sm"
          >
            Amelia
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[11px] uppercase tracking-[0.22em] text-royal-800 font-cinzel font-semibold max-w-[280px] mx-auto leading-relaxed mt-2 mb-6"
          >
            Una reunión para celebrar los 15 años de nuestra hija
          </motion.p>

          {/* Portrait of Amelia in Cinderella dress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-64 h-80 mx-auto rounded-3xl p-1 bg-gradient-to-b from-white via-gold-300 to-gold-500 shadow-xl overflow-hidden mb-5"
          >
            <div className="w-full h-full rounded-[22px] overflow-hidden relative">
              <img
                src="/photos/amelia-hero.jpg"
                alt="Amelia Quinceañera"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-0 right-0 text-center">
                <span className="text-[10px] font-cinzel tracking-widest text-white/95 px-3 py-1 rounded-full bg-royal-950/60 backdrop-blur-md border border-white/20">
                  Amelia • Quince Años
                </span>
              </div>
            </div>
          </motion.div>

          {/* Countdown timer */}
          <CountdownTimer targetDate="2026-11-21T20:00:00" />

          {/* CTA Button to Confirm Attendance */}
          <div className="mt-4 flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onOpenRsvp}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-royal-950 via-royal-900 to-royal-950 text-white font-cinzel text-xs font-semibold tracking-widest uppercase shadow-lg shadow-royal-950/25 border border-gold-400/60 transition-all hover:brightness-110"
            >
              Confirmar Asistencia
            </motion.button>
          </div>

        </div>
      </div>

    </section>
  );
}

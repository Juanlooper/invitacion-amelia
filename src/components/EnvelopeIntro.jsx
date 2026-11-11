import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function EnvelopeIntro({ isOpen, onOpen }) {
  const handleOpen = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#bae0fd', '#ffd700', '#ffffff', '#38a4f6', '#d4af37'],
      });
    } catch (e) {
      console.log(e);
    }
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-[#07152b] via-[#0d2444] to-[#050f1d] text-white"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,164,246,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Envelope Card Container */}
          <motion.div
            initial={{ scale: 0.92, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm mx-auto relative"
          >
            {/* Outer golden border wrapper */}
            <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-2xl">
              <div className="relative rounded-[22px] bg-gradient-to-b from-[#112a4a] to-[#09182b] p-7 text-center overflow-hidden border border-white/10">
                
                {/* Minimal corner lines */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-400/40" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold-400/40" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold-400/40" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-400/40" />

                {/* Crown Icon */}
                <div className="mx-auto w-16 h-12 mb-2 flex items-center justify-center">
                  <img src="/crown.png" alt="Corona" className="w-full h-full object-contain drop-shadow-md" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-ice-200/80 mb-1 font-cinzel font-semibold">
                  Invitación de Honor
                </p>

                <h1 className="font-serif text-3xl font-bold text-white mb-0 drop-shadow">
                  Mis 15 Años
                </h1>

                <p className="font-script text-5xl text-gold-300 my-1 py-1 drop-shadow">
                  Amelia
                </p>

                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-3" />

                <p className="text-xs text-ice-100/90 font-light leading-relaxed mb-6 px-3">
                  Acompáñanos a una reunión muy especial en honor a nuestra hija.
                </p>

                {/* Wax Seal Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleOpen}
                  className="relative group mx-auto flex flex-col items-center justify-center focus:outline-none"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#eed380] via-[#cca031] to-[#7f5c12] p-[2px] shadow-[0_0_25px_rgba(204,160,49,0.5)] flex items-center justify-center transition-all group-hover:shadow-[0_0_35px_rgba(255,215,0,0.7)]">
                    <div className="w-full h-full rounded-full border border-dashed border-[#5a400c]/60 flex flex-col items-center justify-center bg-[#b88c24] text-white">
                      <span className="font-serif text-2xl font-bold tracking-wider text-white drop-shadow">A</span>
                      <span className="text-[8px] font-cinzel uppercase tracking-widest text-amber-100/90 -mt-0.5">Abrir</span>
                    </div>
                  </div>
                  
                  <span className="mt-3.5 text-[10px] font-cinzel font-medium tracking-[0.2em] uppercase text-gold-300/90">
                    Toca para ingresar
                  </span>
                </motion.button>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

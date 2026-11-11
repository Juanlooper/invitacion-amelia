import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function DressCode() {
  return (
    <section className="relative w-full py-6 px-4 max-w-md mx-auto">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-6 text-center border-2 border-gold-400/40 relative overflow-hidden shadow-xl"
      >
        <div className="w-11 h-11 mx-auto mb-2.5 rounded-full bg-gradient-to-br from-gold-100 to-gold-300 border border-gold-500/50 flex items-center justify-center text-royal-900 shadow-sm">
          <Sparkles className="w-5 h-5 text-royal-900" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] text-royal-800 font-cinzel font-semibold">
          Código de Vestimenta
        </span>

        <h3 className="font-serif text-2xl font-bold text-royal-950 mt-1 mb-2">
          Semiformal
        </h3>

        <p className="text-xs text-slate-700 leading-relaxed max-w-xs mx-auto font-light">
          Te invitamos a vestir elegante y cómodo para disfrutar al máximo de esta reunión.
        </p>
      </motion.div>
    </section>
  );
}

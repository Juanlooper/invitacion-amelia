import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

export default function OriginalFlyerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 p-4 bg-black/90 backdrop-blur-md flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-sm w-full bg-royal-950 rounded-3xl overflow-hidden border-2 border-gold-400 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full max-h-[75vh] overflow-y-auto bg-black flex items-center justify-center p-2">
            <img
              src="/invitacion-original.jpg"
              alt="Invitación Original Amelia"
              className="w-full h-auto rounded-xl object-contain shadow-lg"
            />
          </div>

          <div className="p-3 bg-gradient-to-b from-royal-900 to-royal-950 flex items-center justify-between text-white border-t border-gold-400/30">
            <span className="text-xs font-serif text-gold-300">Invitación Original</span>
            <a
              href="/invitacion-original.jpg"
              download="Invitacion-Amelia-15.jpg"
              className="py-1.5 px-3 rounded-lg bg-gold-500 text-royal-950 text-xs font-semibold flex items-center gap-1 hover:bg-gold-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


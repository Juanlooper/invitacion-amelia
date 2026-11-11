import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X, MessageCircle } from 'lucide-react';
import { EVENT_CONFIG } from '../config';

export default function DigitalPassModal({ isOpen, onClose, guestData }) {
  if (!isOpen || !guestData) return null;

  const isAttending = guestData.attending === 'yes';

  // Format WhatsApp confirmation text (formal and elegant, without emojis)
  const whatsappText = isAttending
    ? `Confirmación de Asistencia - 15 Años de Amelia%0A%0AInvitado(a): ${encodeURIComponent(guestData.name)}%0APases reservados: ${guestData.guests}%0AFecha: 21 de Noviembre, 8:00 PM%0ALugar: Casa de Amelia, Barriada San Judas Tadeo calle 3ra${guestData.message ? `%0AMensaje: ${encodeURIComponent(guestData.message)}` : ''}`
    : `Respuesta a Invitación - 15 Años de Amelia%0A%0AEstimada familia, agradezco profundamente la invitación a los 15 años de Amelia. Lamentablemente no podré acompañarles en esta ocasión. Les deseo una velada inolvidable.%0A%0AAtentamente: ${encodeURIComponent(guestData.name)}`;

  // Direct number if configured, or general WhatsApp share
  const whatsappUrl = EVENT_CONFIG.whatsappPhoneNumber
    ? `https://wa.me/${EVENT_CONFIG.whatsappPhoneNumber}?text=${whatsappText}`
    : `https://api.whatsapp.com/send?text=${whatsappText}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 p-4 bg-black/85 backdrop-blur-md flex items-center justify-center overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative max-w-sm w-full bg-gradient-to-b from-[#102d50] via-[#0d223c] to-[#071526] rounded-3xl p-1 border-2 border-gold-400 shadow-2xl my-auto text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-[22px] bg-gradient-to-b from-[#13335c] to-[#0a1b30] p-6 text-center overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Status icon */}
            <div className="mx-auto w-14 h-14 mb-3 rounded-full bg-gold-400/20 border border-gold-400 flex items-center justify-center text-gold-300 shadow-[0_0_20px_rgba(204,165,58,0.5)]">
              {isAttending ? (
                <CheckCircle2 className="w-8 h-8 text-gold-300" />
              ) : (
                <Sparkles className="w-8 h-8 text-ice-200" />
              )}
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-ice-200 font-cinzel font-semibold">
              {isAttending ? 'Pase de Entrada Confirmado' : 'Registro Recibido'}
            </span>

            <h3 className="font-serif text-2xl font-bold text-white mt-1 mb-1">
              {isAttending ? '¡Te Esperamos!' : '¡Gracias por avisarnos!'}
            </h3>

            {/* Guest Name Display */}
            <div className="my-3 py-2 px-4 rounded-xl bg-white/10 border border-gold-400/40">
              <p className="text-xs text-gold-300 font-medium">Invitado(a) de Honor:</p>
              <p className="font-serif text-lg font-bold text-white tracking-wide">
                {guestData.name}
              </p>
              {isAttending && (
                <p className="text-xs text-ice-200 mt-0.5">
                  Pases reservados: <strong className="text-gold-300">{guestData.guests} persona(s)</strong>
                </p>
              )}
            </div>

            {isAttending ? (
              <div className="text-left text-xs text-ice-100/90 space-y-1.5 my-4 p-3 rounded-xl bg-black/25 border border-white/10">
                <p className="flex justify-between">
                  <span className="text-slate-400">Fecha:</span>
                  <strong>21 de Noviembre, 2026</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Hora:</span>
                  <strong>8:00 PM</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Lugar:</span>
                  <span className="text-right font-medium">Casa de Amelia, Calle 3ra</span>
                </p>
              </div>
            ) : (
              <p className="text-xs text-ice-200/90 my-4 leading-relaxed">
                Lamentamos que no puedas acompañarnos, pero apreciamos mucho que nos hayas avisado. ¡Te tendremos presente!
              </p>
            )}

            {/* Action to share / notify on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Notificar a la familia por WhatsApp
            </a>

            <button
              onClick={onClose}
              className="w-full mt-2 py-2 text-xs text-slate-300 hover:text-white transition-colors"
            >
              Cerrar
            </button>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, Heart, Sparkles, Send, Users, User, Phone, MessageSquare } from 'lucide-react';
import { EVENT_CONFIG } from '../config';

export default function RsvpSection({ onShowPass }) {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('amelia_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedData(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem('amelia_rsvp', JSON.stringify(submission));
    setSavedData(submission);

    // Send to Google Sheets webhook if configured
    if (EVENT_CONFIG.googleSheetsWebhookUrl) {
      try {
        await fetch(EVENT_CONFIG.googleSheetsWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(submission),
        });
      } catch (err) {
        console.warn('Webhook delivery notice:', err);
      }
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#38a4f6', '#ffd700', '#ffffff', '#bae0fd'],
      });
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
    onShowPass(submission);
  };

  return (
    <section id="rsvp-section" className="relative w-full py-10 px-4 max-w-md mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-cinzel font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Confirmación de Asistencia
        </span>
        <h2 className="font-serif text-3xl font-bold text-white drop-shadow mt-1">
          ¿Nos Acompañas?
        </h2>
        <p className="text-xs text-ice-200/80 font-light mt-1 max-w-xs mx-auto">
          Por favor confirma tu presencia antes del 18 de Noviembre para preparar tu lugar especial.
        </p>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2" />
      </div>

      {savedData ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-6 text-center border-2 border-gold-400 shadow-xl"
        >
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-700">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-royal-950">
            Respuesta Registrada
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Invitado: <strong className="text-royal-900">{savedData.name}</strong>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Estado: {savedData.attending === 'yes' ? 'Confirmado (Asistirá)' : 'Notificado (No asistirá)'} {savedData.attending === 'yes' ? `• ${savedData.guests} pase(s)` : ''}
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => onShowPass(savedData)}
              className="w-full py-3 px-4 rounded-xl bg-royal-900 text-white text-xs font-semibold tracking-wider uppercase shadow hover:bg-royal-800 transition-all"
            >
              Ver mi Pase Digital
            </button>
            <button
              onClick={() => setSavedData(null)}
              className="text-[11px] text-slate-500 hover:text-royal-900 underline mt-1"
            >
              Modificar mi respuesta
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 space-y-4 shadow-2xl border-2 border-gold-400/50"
        >
          {/* Nombre */}
          <div>
            <label className="block text-xs font-cinzel font-bold text-royal-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-royal-700" /> Nombre y Apellido *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Familia Rodríguez o Juan Pérez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/90 border border-ice-300 text-royal-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 shadow-inner"
            />
          </div>

          {/* Asistencia */}
          <div>
            <label className="block text-xs font-cinzel font-bold text-royal-900 uppercase tracking-wider mb-2">
              ¿Podrás asistir? *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                className={`py-3 px-3 rounded-xl text-xs font-cinzel font-semibold tracking-wider uppercase transition-all ${
                  formData.attending === 'yes'
                    ? 'bg-royal-900 text-white border border-gold-400 shadow-md'
                    : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Sí, asistiré</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'no' })}
                className={`py-3 px-3 rounded-xl text-xs font-cinzel font-semibold tracking-wider uppercase transition-all ${
                  formData.attending === 'no'
                    ? 'bg-royal-900 text-white border border-gold-400 shadow-md'
                    : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>No podré asistir</span>
              </button>
            </div>
          </div>

          {/* Cantidad de personas si asiste */}
          {formData.attending === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-xs font-cinzel font-bold text-royal-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-royal-700" /> Cantidad de personas
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-ice-300 text-royal-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-inner"
              >
                <option value="1">1 persona (Solo yo)</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5 personas</option>
              </select>
            </motion.div>
          )}

          {/* Teléfono / WhatsApp opcional */}
          <div>
            <label className="block text-xs font-cinzel font-bold text-royal-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-royal-700" /> Teléfono o WhatsApp
            </label>
            <input
              type="tel"
              placeholder="Opcional para enviarte recordatorio"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/90 border border-ice-300 text-royal-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 shadow-inner"
            />
          </div>

          {/* Mensaje o Dedicatoria para Amelia */}
          <div>
            <label className="block text-xs font-cinzel font-bold text-royal-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-royal-700" /> Mensaje para Amelia
            </label>
            <textarea
              rows="2"
              placeholder="Escríbele un lindo mensaje o dedicatoria..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-ice-300 text-royal-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-slate-400 shadow-inner resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-royal-950 via-royal-900 to-royal-950 text-white font-serif text-sm font-bold tracking-wider uppercase border border-gold-400 shadow-xl shadow-royal-950/40 flex items-center justify-center gap-2 transition-all active:scale-98 hover:brightness-110 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-gold-300 border-t-transparent rounded-full animate-spin" />
                Registrando...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4 text-gold-300" />
                Confirmar Asistencia
              </>
            )}
          </button>
        </motion.form>
      )}
    </section>
  );
}


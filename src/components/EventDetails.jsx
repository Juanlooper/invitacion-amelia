import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, ExternalLink } from 'lucide-react';
import { EVENT_CONFIG } from '../config';

export default function EventDetails() {
  const { locationName, locationAddress, locationCoordinates, googleMapsUrl, wazeUrl } = EVENT_CONFIG;
  
  // Google Maps standard embed URL
  const embedUrl = `https://maps.google.com/maps?q=${locationCoordinates.lat},${locationCoordinates.lng}&hl=es&z=17&output=embed`;

  // Google Calendar URL (21 Nov 2026 8:00 PM)
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('15 Años de Amelia')}&dates=20261122T010000Z/20261122T060000Z&details=${encodeURIComponent('Reunión de los 15 Años de Amelia. Te esperamos.')}&location=${encodeURIComponent(`${locationName}, ${locationAddress}`)}`;

  return (
    <section className="relative w-full py-8 px-4 max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-cinzel font-semibold">
          Cuándo & Dónde
        </span>
        <h2 className="font-serif text-3xl font-bold text-white drop-shadow mt-1">
          Detalles de la Reunión
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2" />
      </div>

      <div className="space-y-4">
        {/* Date Card */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-4 flex items-center gap-4 transition-all hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-200 to-ice-400 border border-gold-400/50 flex items-center justify-center text-royal-900 shadow-sm shrink-0">
            <Calendar className="w-6 h-6 text-royal-900" />
          </div>
          <div className="flex-1">
            <h3 className="font-cinzel text-xs uppercase tracking-wider text-royal-800 font-bold">
              Fecha
            </h3>
            <p className="font-serif text-lg font-bold text-royal-950">
              Sábado, 21 de Noviembre
            </p>
            <p className="text-xs text-slate-600">2026</p>
          </div>
        </motion.div>

        {/* Time Card */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-4 flex items-center gap-4 transition-all hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-200 to-ice-400 border border-gold-400/50 flex items-center justify-center text-royal-900 shadow-sm shrink-0">
            <Clock className="w-6 h-6 text-royal-900" />
          </div>
          <div className="flex-1">
            <h3 className="font-cinzel text-xs uppercase tracking-wider text-royal-800 font-bold">
              Hora
            </h3>
            <p className="font-serif text-lg font-bold text-royal-950">
              8:00 PM
            </p>
            <p className="text-xs text-slate-600">Recepción y Gala</p>
          </div>
        </motion.div>

        {/* Location & Embedded Interactive Map Card */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-4 transition-all hover:shadow-xl border-2 border-gold-400/50"
        >
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-200 to-ice-400 border border-gold-400/50 flex items-center justify-center text-royal-900 shadow-sm shrink-0">
              <MapPin className="w-6 h-6 text-royal-900" />
            </div>
            <div className="flex-1">
              <h3 className="font-cinzel text-xs uppercase tracking-wider text-royal-800 font-bold">
                Lugar de la Reunión
              </h3>
              <p className="font-serif text-lg font-bold text-royal-950 leading-snug">
                {locationName}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {locationAddress}
              </p>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-gold-400/50 shadow-md mb-3 bg-slate-100">
            <iframe
              title="Ubicación Casa de Amelia"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Action Buttons for Navigation & Calendar */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-royal-900 hover:bg-royal-800 text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-gold-300" />
              Google Maps
            </a>
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-white" />
              Waze
            </a>
          </div>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-2.5 px-3 rounded-xl bg-white border border-gold-400 text-royal-900 text-xs font-medium text-center flex items-center justify-center gap-1.5 shadow-sm transition-all hover:bg-gold-50 active:scale-95"
          >
            <CalendarPlus className="w-4 h-4 text-gold-600" />
            Agregar a mi Calendario
          </a>
        </motion.div>
      </div>

      {/* Royal Navy Ribbon "Te esperamos" from the invitation flyer */}
      <motion.div
        whileInView={{ scale: [0.95, 1], opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <div className="relative inline-block px-8 py-3 rounded-full bg-gradient-to-r from-royal-950 via-royal-900 to-royal-950 border border-gold-400/80 shadow-xl">
          <span className="font-script text-3xl text-white tracking-wide drop-shadow px-2">
            Te esperamos
          </span>
        </div>
      </motion.div>
    </section>
  );
}

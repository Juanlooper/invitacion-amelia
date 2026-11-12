import React, { useState } from 'react';
import SparklesBackground from './components/SparklesBackground';
import FloatingMusic from './components/FloatingMusic';
import EnvelopeIntro from './components/EnvelopeIntro';
import HeroSection from './components/HeroSection';
import EventDetails from './components/EventDetails';
import RsvpSection from './components/RsvpSection';
import DigitalPassModal from './components/DigitalPassModal';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setShouldPlayMusic(true);
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1b33] via-[#0d264a] to-[#071324] text-slate-100 relative selection:bg-gold-400 selection:text-royal-950">
      
      {/* Background Star Twinkles */}
      <SparklesBackground />

      {/* Floating Ambient Music Controller */}
      <FloatingMusic shouldPlay={shouldPlayMusic} />

      {/* Virtual Envelope Entrance */}
      <EnvelopeIntro isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* Main Content (Mobile-First 100%) */}
      <main className="relative z-10 max-w-lg mx-auto pb-16 px-1">
        
        {/* Hero Banner with Countdown & Portrait */}
        <HeroSection onOpenRsvp={scrollToRsvp} />

        {/* Date, Time, Location & Maps */}
        <EventDetails />

        {/* RSVP Confirmation Section */}
        <RsvpSection onShowPass={(pass) => setSelectedPass(pass)} />

        {/* Footer */}
        <footer className="text-center pt-8 pb-6 text-xs text-ice-200/60 font-light border-t border-white/10 mt-8">
          <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold-300/80">
            Amelia • Quince Años
          </p>
          <p className="mt-1 text-[11px] text-slate-400 font-light">
            21 de Noviembre, 2026 • Casa de Amelia
          </p>
        </footer>
      </main>

      {/* Floating RSVP Button */}
      {isEnvelopeOpen && !selectedPass && (
        <div className="fixed bottom-6 left-4 right-20 z-40 max-w-sm">
          <button
            onClick={scrollToRsvp}
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-royal-950 via-royal-900 to-royal-950 text-white font-cinzel text-xs font-semibold tracking-wider uppercase border border-gold-400/80 shadow-[0_8px_30px_rgba(0,0,0,0.65)] backdrop-blur-md active:scale-95 transition-all hover:brightness-110 flex items-center justify-center gap-2"
          >
            Confirmar Asistencia
          </button>
        </div>
      )}

      {/* Digital Pass / Ticket Modal */}
      <DigitalPassModal
        isOpen={!!selectedPass}
        onClose={() => setSelectedPass(null)}
        guestData={selectedPass}
      />
    </div>
  );
}


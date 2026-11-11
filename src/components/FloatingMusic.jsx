import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function FloatingMusic({ shouldPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Checks local music.mp3 first, then falls back to public royalty-free track
  const audioUrl = "/music.mp3";

  // Web Audio API Synthesizer (Music Box fairytale harp chime fallback)
  const playSynthesizedMelody = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Fairytale waltz notes (Frequencies in Hz)
      const notes = [
        523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
        880.00, 659.25, 783.99, 1046.50, // A5, E5, G5, C6
        698.46, 880.00, 1046.50, 1318.51, // F5, A5, C6, E6
        783.99, 987.77, 1174.66, 1567.98  // G5, B5, D6, G6
      ];

      let noteIndex = 0;
      synthIntervalRef.current = setInterval(() => {
        if (!ctx || ctx.state !== 'running') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        noteIndex++;
      }, 420);
    } catch (e) {
      console.warn("Synthesizer fallback unavailable", e);
    }
  };

  const stopSynthesizedMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If local audio file is not present, use the fairytale music-box synth
          playSynthesizedMelody();
          setIsPlaying(true);
        });
    } else {
      playSynthesizedMelody();
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthesizedMelody();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      startMusic();
    }
  }, [shouldPlay]);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onError={() => {
          // Graceful fallback to synthesizer
          if (isPlaying) playSynthesizedMelody();
        }}
      />
      <button
        onClick={toggleMusic}
        aria-label="Reproducir o pausar música"
        className="fixed bottom-6 right-4 z-40 p-3.5 rounded-full bg-royal-950/90 text-gold-300 border border-gold-400/80 shadow-2xl backdrop-blur-md transition-all active:scale-95 hover:scale-105 group"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <span className="absolute -inset-1 rounded-full bg-gold-400/30 animate-ping opacity-75" />
              <Volume2 className="w-5 h-5 text-gold-300 animate-pulse" />
            </>
          ) : (
            <VolumeX className="w-5 h-5 text-slate-300" />
          )}
        </div>
      </button>
    </>
  );
}

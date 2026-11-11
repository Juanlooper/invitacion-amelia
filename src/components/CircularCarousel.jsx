import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export default function CircularCarousel({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);
  const total = items.length;

  // Responsive radius based on screen width
  const [radius, setRadius] = useState(260);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 380) {
          setRadius(210);
        } else if (width < 640) {
          setRadius(250);
        } else {
          setRadius(320);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const angleStep = 360 / Math.max(total, 1);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotation timer: gira solo automáticamente cada 3.2 segundos
  useEffect(() => {
    if (isDragging || selectedItem) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3200);
    return () => clearInterval(interval);
  }, [isDragging, selectedItem, total]);

  // Touch / pointer handlers for momentum drag
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = currentX - dragStartX;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 40; // minimum drag distance to trigger rotation
    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    setDragOffset(0);
  };

  const handleCardClick = (index) => {
    if (Math.abs(dragOffset) > 8) return; // Ignore clicks if dragged
    if (index === currentIndex) {
      setSelectedItem(items[index]);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative w-full py-8 select-none overflow-hidden">
      
      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative w-full h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1100px',
        }}
      >
        <div
          className="relative w-[210px] h-[300px] transition-transform duration-500 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${-(currentIndex * angleStep) + (dragOffset * 0.15)}deg)`,
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * angleStep;
            
            // Normalize angle relative to front
            let relAngle = ((itemAngle - (currentIndex * angleStep)) % 360);
            if (relAngle > 180) relAngle -= 360;
            if (relAngle < -180) relAngle += 360;

            const isFront = Math.abs(relAngle) < angleStep / 2;
            const distanceRatio = Math.abs(relAngle) / 180;
            const opacity = Math.max(0.25, 1 - distanceRatio * 1.1);

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border border-gold-400/50 bg-royal-950"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: opacity,
                  filter: isFront ? 'none' : 'brightness(0.7) blur(0.5px)',
                  zIndex: isFront ? 30 : Math.round(20 - distanceRatio * 10),
                }}
              >
                {/* Photo */}
                <img
                  src={item.url}
                  alt={item.title}
                  draggable="false"
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                />

                {/* Elegant Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-royal-950/90 via-royal-950/20 to-transparent pointer-events-none" />

                {/* Clean Category Pill */}
                <div className="absolute top-2.5 left-2.5 pointer-events-none">
                  <span className="text-[9px] uppercase tracking-widest font-cinzel text-gold-300 font-semibold px-2 py-0.5 rounded-full bg-royal-950/70 border border-gold-400/30 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom Hint on Front Card */}
                {isFront && (
                  <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-royal-950/60 border border-white/20 text-white/90">
                    <ZoomIn className="w-3 h-3" />
                  </div>
                )}

                {/* Card Title & Subtitle */}
                <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                  <p className="font-serif text-sm font-bold text-white tracking-wide leading-tight drop-shadow">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-ice-200/90 font-light mt-0.5 drop-shadow">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls and Indicator Dots */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={prev}
          aria-label="Foto anterior"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-gold-400/40 text-gold-300 transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Minimal dot indicators */}
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ver foto ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-gold-400 shadow-sm'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Foto siguiente"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-gold-400/40 text-gold-300 transition-all shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-[10px] uppercase tracking-widest text-gold-400/70 font-cinzel mt-2">
        Desliza para girar • Toca para ampliar
      </p>

      {/* High-definition Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 p-4 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-sm w-full bg-royal-950 rounded-2xl overflow-hidden border border-gold-400/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full max-h-[72vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[72vh] object-contain"
                />
              </div>

              <div className="p-4 bg-gradient-to-b from-royal-900 to-royal-950 text-white text-center border-t border-gold-400/30">
                <h4 className="font-serif text-base font-bold text-gold-300">
                  {selectedItem.title}
                </h4>
                <p className="text-xs text-ice-200/90 font-light mt-0.5">
                  {selectedItem.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


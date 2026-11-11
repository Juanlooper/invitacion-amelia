import React from 'react';
import CircularCarousel from './CircularCarousel';

export default function PhotoGallery() {
  const photos = [
    {
      url: '/photos/amelia-stairs.jpg',
      title: 'El Cuento de Hadas',
      subtitle: 'La zapatilla de cristal',
      tag: '15 Años',
    },
    {
      url: '/photos/amelia-hero.jpg',
      title: 'Una Rosa para Amelia',
      subtitle: 'Corona de cristales',
      tag: '15 Años',
    },
    {
      url: '/photos/amelia-bouquet.jpg',
      title: 'Rosas e Ilusiones',
      subtitle: 'Bouquet especial',
      tag: '15 Años',
    },
    {
      url: '/photos/amelia-balcony.jpg',
      title: 'Mirada al Futuro',
      subtitle: 'Brillando en su noche',
      tag: '15 Años',
    },
    {
      url: '/photos/amelia-pollera.png',
      title: 'Orgullo y Tradición',
      subtitle: 'Raíces panameñas',
      tag: 'Cultura',
    },
    {
      url: '/photos/amelia-beach.jpg',
      title: 'Brisa de Mar',
      subtitle: 'Atardecer inolvidable',
      tag: 'Playa',
    },
    {
      url: '/photos/amelia-baby.jpg',
      title: 'Primeros Pasos',
      subtitle: 'Nació nuestra alegría',
      tag: 'Infancia',
    },
    {
      url: '/photos/amelia-toddler.jpg',
      title: 'Sonrisas',
      subtitle: 'Luz en el hogar',
      tag: 'Infancia',
    },
  ];

  return (
    <section className="relative w-full py-10 px-2 max-w-md mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-cinzel font-semibold">
          Memorias
        </span>
        <h2 className="font-serif text-3xl font-bold text-white tracking-wide mt-1 drop-shadow">
          El Tiempo Vuela
        </h2>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2.5" />
      </div>

      {/* 3D Circular Carousel Component */}
      <CircularCarousel items={photos} />
    </section>
  );
}

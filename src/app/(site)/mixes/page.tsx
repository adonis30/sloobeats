'use client';

import MixCard from '@/components/MixCard';

const sampleMixes = [
  {
    title: 'Night Club Groove',
    genre: 'House',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // ✅ renamed
    coverUrl: '/images/mix1.jpeg',
  },
  {
    title: 'Deep Chill Vibes',
    genre: 'Chillout',
    url: 'https://www.youtube.com/watch?v=I9iXHAgjXhA&list=RDI9iXHAgjXhA&start_radio=1', // ✅ renamed
    coverUrl: '/images/mix2.jpeg',
    premium: true,
  },
  {
    title: 'Festival Energy',
    genre: 'EDM',
    url: 'https://www.youtube.com/watch?v=5fe3HZm0spk&list=RD5fe3HZm0spk&start_radio=1', // ✅ renamed
    coverUrl: '/images/mix3.jpeg',
  },
];

export default function MixesPage() {
  return (
    <div className="relative px-6 py-20 max-w-6xl mx-auto">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-300/20 blur-[120px] -top-32 -left-32 animate-pulse" />
        <div className="absolute w-96 h-96 bg-purple-400/20 blur-[120px] -bottom-32 -right-32 animate-pulse" />
      </div>

      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-12 text-center drop-shadow-lg">
        🎶 DJ Mixes
      </h1>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleMixes.map((mix, idx) => (
          <MixCard key={idx} {...mix} />
        ))}
      </div>
    </div>
  );
}

// src/app/(site)/mixes/page.tsx
'use client';

import MixCard from '@/components/MixCard';

const sampleMixes = [
  {
    title: 'Night Club Groove',
    genre: 'House',
    audioUrl: '/audio/mix1.mp3',
  },
  {
    title: 'Deep Chill Vibes',
    genre: 'Chillout',
    audioUrl: '/audio/mix2.mp3',
    premium: true,
  },
  {
    title: 'Festival Energy',
    genre: 'EDM',
    audioUrl: '/audio/mix3.mp3',
  },
];

export default function MixesPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 text-center">🎶 DJ Mixes</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleMixes.map((mix, idx) => (
          <MixCard key={idx} {...mix} />
        ))}
      </div>
    </div>
  );
}

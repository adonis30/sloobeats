'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import GalleryCard from '@/components/GalleryCard';

const galleryImages = [
  { imageUrl: '/images/event1.jpeg', title: 'Club Night' },
  { imageUrl: '/images/event2.jpeg', title: 'Festival Stage' },
  { imageUrl: '/images/hero.jpg', title: 'DJ Booth' },
  { imageUrl: '/images/mix1.jpeg', title: 'Crowd Vibes' },
  { imageUrl: '/images/mix2.jpeg', title: 'Live Performance' },
  { imageUrl: '/images/mix3.jpeg', title: 'Mix Session' },
  { imageUrl: '/images/mix4.jpeg', title: 'Backstage Vibes' },
  { imageUrl: '/images/sloo.jpeg', title: 'After Party' },
];

// Randomize order + featured indices
const randomizeLayout = (array: typeof galleryImages) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  const highlightIndexes = new Set<number>();
  while (highlightIndexes.size < 3) {
    highlightIndexes.add(Math.floor(Math.random() * shuffled.length));
  }
  return { shuffled, highlightIndexes };
};

export default function GalleryPage() {
  const [layout, setLayout] = useState(() => randomizeLayout(galleryImages));

  // 🔁 Automatically reshuffle every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLayout(randomizeLayout(galleryImages));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const { shuffled, highlightIndexes } = layout;

  return (
    <div className="relative px-6 py-16 max-w-7xl mx-auto">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-pink-500/10 blur-[140px] top-[-150px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-[140px] bottom-[-150px] right-[-100px]" />
      </div>

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-12 drop-shadow-lg">
        📸 Gallery
      </h1>

      {/* Regular static cards */}
      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {galleryImages.slice(0, 4).map((img, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <GalleryCard {...img} />
          </motion.div>
        ))}
      </motion.div>

      {/* 🌈 BentoBox */}
      <div className="relative mb-16">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-8">
          Dynamic Moments 🌀
        </h2>

        <motion.div
          className="relative rounded-3xl overflow-hidden p-4 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
          layout
          transition={{ layout: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <div
            className="
              grid gap-4
              grid-cols-4
              auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[220px]
            "
          >
            <AnimatePresence>
              {shuffled.map((item, idx) => {
                const isHighlight = highlightIndexes.has(idx);
                const shape =
                  isHighlight && Math.random() > 0.3
                    ? 'col-span-2 row-span-2'
                    : Math.random() > 0.7
                    ? 'col-span-2'
                    : '';

                return (
                  <motion.div
                    key={item.imageUrl}
                    layout
                    className={`relative overflow-hidden rounded-2xl group ${shape}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness: 160,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                      {item.title}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <p className="text-center text-gray-400 text-sm mt-10">
        Capturing every vibe, every moment ⚡
      </p>
    </div>
  );
}

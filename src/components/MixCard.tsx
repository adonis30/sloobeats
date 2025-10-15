'use client';

import { usePlayer } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { StarIcon, PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface MixCardProps {
  title: string;
  genre: string;
  url: string;        // ✅ renamed
  coverUrl: string;
  premium?: boolean;
}

export default function MixCard({ title, genre, url, coverUrl, premium }: MixCardProps) {
  const { playTrack } = usePlayer();

  return (
    <motion.div
      className="relative group rounded-2xl bg-gray-900/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 flex flex-col gap-4 border border-white/10 shadow-lg hover:shadow-pink-500/20 transition-all overflow-hidden"
      whileHover={{ scale: 1.03 }}
    >
      {/* Cover Image */}
      <div className="relative rounded-xl overflow-hidden h-52 sm:h-60 shadow-md">
        <Image
          src={coverUrl}
          alt={`${title} cover`}
          fill
          sizes='auto'
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.button
            onClick={() => playTrack({ title, genre, coverUrl, url })} // ✅ updated
            className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
            whileTap={{ scale: 0.9 }}
          >
            <PlayIcon className="w-7 h-7" />
          </motion.button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h3 className="text-xl font-bold text-white truncate">{title}</h3>
        {premium && (
          <span className="flex items-center gap-1 text-yellow-400 text-sm font-semibold bg-yellow-500/10 px-2 py-1 rounded-full">
            <StarIcon className="w-4 h-4" /> Premium
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm uppercase tracking-wide">{genre}</p>
    </motion.div>
  );
}

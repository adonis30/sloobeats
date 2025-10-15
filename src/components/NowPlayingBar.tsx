'use client';

import { usePlayer } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

export default function NowPlayingBar() {
  const { currentTrack, playing, progress, duration, togglePlay } = usePlayer();

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 text-white px-6 py-3 flex flex-col gap-3"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
    >
      {/* === Top Row === */}
      {currentTrack ? (
        <div className="flex items-center justify-between w-full">
          {/* Cover + Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md shadow-pink-600/30">
              <Image
                src={currentTrack.coverUrl ?? '/images/default-cover.jpg'}
                alt={currentTrack.title || 'Now Playing'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-semibold text-sm">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.genre}</p>
            </div>
          </div>

          {/* Waveform animation */}
          <div className="flex gap-[3px] items-center justify-center h-6 mx-auto">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-pink-600 to-purple-500"
                animate={{
                  height: playing
                    ? [`0.3rem`, `${Math.random() * 1.4 + 0.8}rem`, `0.3rem`]
                    : '0.3rem',
                  opacity: playing ? [0.7, 1, 0.7] : 0.5,
                }}
                transition={{
                  duration: 0.6 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-500 p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition-transform"
          >
            {playing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          </button>
        </div>
      ) : (
        /* Skeleton Loader */
        <div className="flex items-center justify-between w-full animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg" />
            <div className="flex flex-col gap-2">
              <div className="w-24 h-3 bg-gray-700 rounded-md" />
              <div className="w-16 h-3 bg-gray-700 rounded-md" />
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-700 rounded-full" />
        </div>
      )}

      {/* === Glowing Progress Bar === */}
      <div className="relative flex items-center gap-3">
        <span className="text-xs text-gray-400 w-10 text-right">
          {currentTrack ? formatTime(progress) : '--:--'}
        </span>

        <div className="relative flex-1 h-2 bg-gray-700/60 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-800/40" />
          {currentTrack && (
            <>
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 shadow-[0_0_20px_3px_rgba(236,72,153,0.5)] rounded-full"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: 'easeInOut', duration: 0.2 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400/40 to-transparent blur-xl"
                style={{ width: `${progressPercent + 3}%` }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                style={{ left: `${progressPercent}%` }}
              />
            </>
          )}
        </div>

        <span className="text-xs text-gray-400 w-10">
          {currentTrack ? formatTime(duration) : '--:--'}
        </span>
      </div>
    </motion.div>
  );
}

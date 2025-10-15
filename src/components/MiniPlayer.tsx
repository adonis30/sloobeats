'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { usePlayer } from '@/context/PlayerContext';

export default function MiniPlayer() {
  const {
    currentTrack,
    playing,
    togglePlay,
    toggleMute,
    muted,
    progress,
    duration,
    seekTo,
    skipForward,
    skipBackward,
    stopPlayback,
  } = usePlayer();

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bar = document.querySelector('#now-playing-bar');
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      setVisible(rect.top > window.innerHeight || rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentTrack || !visible) return null;

  const progressPercent = duration ? (progress / duration) * 100 : 0;
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <>
      {/* Floating Mini Player */}
      <motion.div
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50 bg-gray-900/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.4)] p-3 flex items-center gap-3 max-w-[280px] cursor-pointer hover:scale-[1.02] transition-transform"
      >
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={currentTrack.coverUrl ?? '/images/default-cover.jpg'}
            alt={currentTrack.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-white text-sm truncate">{currentTrack.title}</p>
          <p className="text-xs text-gray-400 truncate">{currentTrack.genre}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-500 p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition-transform"
          title={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon className="w-5 h-5 text-white" /> : <PlayIcon className="w-5 h-5 text-white" />}
        </button>
      </motion.div>

      {/* Expanded Player */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:max-w-md bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.3)] overflow-hidden text-center"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-lg">{currentTrack.title}</h3>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Cover */}
              <div className="relative w-full aspect-square sm:w-80 sm:h-80 mx-auto mt-4 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(236,72,153,0.4)]">
                <Image
                  src={currentTrack.coverUrl ?? '/images/default-cover.jpg'}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-4 p-6">
                {/* Circular Progress */}
                <div className="relative w-24 h-24">
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#grad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        pathLength: progressPercent / 100,
                        rotate: -90,
                        transformOrigin: 'center center',
                      }}
                    />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
                    title={playing ? 'Pause' : 'Play'}
                  >
                    {playing ? (
                      <PauseIcon className="w-8 h-8 text-white" />
                    ) : (
                      <PlayIcon className="w-8 h-8 text-white" />
                    )}
                  </button>
                </div>

                {/* Skip / Mute / Stop */}
                <div className="flex gap-4 items-center justify-center">
                  <button
                    onClick={() => skipBackward(10)}
                    className="text-xs px-2 py-1 rounded hover:bg-white/10 text-white"
                  >
                    -10s
                  </button>
                  <button
                    onClick={() => skipForward(10)}
                    className="text-xs px-2 py-1 rounded hover:bg-white/10 text-white"
                  >
                    +10s
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded hover:bg-white/10"
                    title={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? (
                      <SpeakerXMarkIcon className="w-5 h-5 text-gray-300" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <button
                    onClick={stopPlayback}
                    className="p-2 rounded hover:bg-white/10"
                    title="Stop"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  </button>
                </div>

                {/* Waveform */}
                <div className="flex gap-[4px] items-center justify-center h-8">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[4px] rounded-full bg-gradient-to-t from-pink-500 to-purple-400"
                      animate={{
                        height: playing
                          ? [`0.4rem`, `${Math.random() * 1.4 + 1}rem`, `0.4rem`]
                          : '0.4rem',
                      }}
                      transition={{
                        duration: 0.5 + i * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                {/* Time */}
                <p className="text-gray-400 text-sm">
                  {formatTime(progress)} / {formatTime(duration)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

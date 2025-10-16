'use client';

import { useEffect, useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';

export default function NowPlayingBar() {
  const {
    currentTrack,
    playing,
    progress,
    duration,
    muted,
    togglePlay,
    toggleMute,
    seekTo,
    skipForward,
    skipBackward,
    stopPlayback,
  } = usePlayer();

  const [isVisible, setIsVisible] = useState(false);

  // 🎵 Show only when a track is playing
  useEffect(() => {
    setIsVisible(!!currentTrack && playing);
  }, [currentTrack, playing]);

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = duration * percent;
    seekTo(newTime);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="now-playing"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          className="fixed bottom-0 left-0 w-full z-40 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 text-white px-6 py-3 flex flex-col gap-3"
        >
          {/* === Top Row === */}
          <div className="flex items-center justify-between w-full">
            {/* Cover + Title */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md shadow-pink-600/30">
                <Image
                  src={currentTrack?.coverUrl ?? '/images/default-cover.jpg'}
                  alt={currentTrack?.title || 'Now Playing'}
                  fill
                  sizes="auto"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{currentTrack?.title}</p>
                <p className="text-xs text-gray-400">{currentTrack?.genre}</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => skipBackward(10)}
                className="text-xs px-2 py-1 rounded hover:bg-white/10"
                title="Skip Backward"
              >
                -10s
              </button>

              <button
                onClick={togglePlay}
                className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-500 p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition-transform"
                title={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => skipForward(10)}
                className="text-xs px-2 py-1 rounded hover:bg-white/10"
                title="Skip Forward"
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
          </div>

          {/* === Progress Bar === */}
          <div className="relative flex items-center gap-3">
            <span className="text-xs text-gray-400 w-10 text-right">
              {currentTrack ? formatTime(progress) : '--:--'}
            </span>

            <div
              className="relative flex-1 h-2 bg-gray-700/60 rounded-full overflow-hidden cursor-pointer"
              onClick={handleSeek}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: 'easeInOut', duration: 0.2 }}
              />
            </div>

            <span className="text-xs text-gray-400 w-10">
              {currentTrack ? formatTime(duration) : '--:--'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

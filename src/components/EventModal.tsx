'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface EventModalProps {
  title: string;
  date: string;
  location: string;
  flyerUrl: string;
  link: string;
  onClose: () => void;
}

export default function EventModal({
  title,
  date,
  location,
  flyerUrl,
  link,
  onClose,
}: EventModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Cinematic Backdrop with Focus Blur */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layoutId={`card-${title}`}
          className="relative max-w-3xl w-full bg-white/90 dark:bg-gray-900/90 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/30"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          {/* Shared Flyer Image */}
          <motion.div layoutId={`image-${title}`} className="relative h-72 sm:h-80 w-full">
            <Image src={flyerUrl} alt={title} fill sizes='auto' className="object-cover" priority />
          </motion.div>

          {/* Light fade overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6 }}
          />

          {/* Text content */}
          <motion.div
            className="p-6 sm:p-8 text-center sm:text-left relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-1">📍 {location}</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">🗓️ {date}</p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Dive into the pulse of the night — a fusion of rhythm, energy, and sound. 
              Sloobeats transforms every beat into an experience that lights up the dance floor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <a
                href={link}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-300"
              >
                🎟️ Reserve Ticket
              </a>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full border border-gray-400 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </motion.div>

          {/* Pulsing Glow Ring */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-3xl"
            animate={{
              boxShadow: [
                '0 0 30px 5px rgba(168,85,247,0.3)',
                '0 0 60px 15px rgba(236,72,153,0.4)',
                '0 0 30px 5px rgba(168,85,247,0.3)',
              ],
            }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />

          {/* Background “sound wave” pulses */}
          <motion.div
            className="absolute inset-0 -z-20"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            style={{
              background: 'radial-gradient(circle at center, rgba(168,85,247,0.15), transparent 70%)',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

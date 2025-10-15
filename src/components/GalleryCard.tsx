'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface GalleryCardProps {
  imageUrl: string;
  title?: string;
}

interface LightboxProps {
  images: GalleryCardProps[];
  index: number;
  onClose: () => void;
}

export default function GalleryCard({ imageUrl, title }: GalleryCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-pink-500/20 transition-all cursor-pointer"
      >
        <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title || 'Gallery Image'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {title && (
            <div className="absolute bottom-4 left-4 text-white">
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-semibold drop-shadow-md"
              >
                {title}
              </motion.h3>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <Lightbox
            images={[{ imageUrl, title }]} // Single-card lightbox
            index={0}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* 🪩 Fullscreen Lightbox Component with Keyboard Navigation */
function Lightbox({ images, index, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(index);
  const currentImage = images[currentIndex];

  const prev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Handle keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[90vw] md:w-[70vw] lg:w-[60vw] h-[70vh] rounded-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click
      >
        {/* Image Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.imageUrl}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.title || 'Gallery Image'}
              fill
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Left / Right Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Title Overlay */}
        {currentImage.title && (
          <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black/70 to-transparent py-4 text-white text-lg font-semibold">
            {currentImage.title}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

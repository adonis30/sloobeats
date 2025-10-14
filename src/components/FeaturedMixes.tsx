'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/solid';

const mixes = [
  {
    id: 1,
    title: 'Deep House Sessions Vol. 1',
    duration: '1h 02m',
    image: '/images/mix3.jpg',
    link: '/mixes/deep-house-sessions',
  },
  {
    id: 2,
    title: 'Afrobeat Lounge',
    duration: '58m',
    image: '/images/mix2.jpg',
    link: '/mixes/afrobeat-lounge',
  },
  {
    id: 3,
    title: 'Sunset Chill Vibes',
    duration: '1h 15m',
    image: '/images/mix1.jpg',
    link: '/mixes/sunset-chill-vibes',
  },
];

export default function FeaturedMixes() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Mixes
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mixes.map((mix, index) => (
            <motion.div
              key={mix.id}
              className="relative group overflow-hidden rounded-3xl shadow-lg bg-gray-100 dark:bg-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={mix.image}
                  alt={mix.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay with Play Button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={mix.link}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <PlayIcon className="w-8 h-8 text-white" />
                  </Link>
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {mix.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{mix.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/mixes"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            🎧 Browse All Mixes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: 'Midnight Vibes — Ndola',
    date: 'Oct 28, 2025',
    image: '/images/event1.jpeg',
    link: '/events/midnight-vibes',
  },
  {
    id: 2,
    title: 'Summer Groove — Lusaka',
    date: 'Nov 16, 2025',
    image: '/images/event2.jpeg',
    link: '/events/summer-groove',
  },
];

export default function FeaturedEvents() {
  return (
    <section className="relative py-24 bg-gray-100 dark:bg-gray-950 z-20">
      {/* Smooth gradient transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900/10 dark:from-black/20 to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-30">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Events
        </motion.h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative overflow-hidden rounded-3xl shadow-lg group bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
              </div>

              {/* Overlay Info - positioned at bottom but not too tall */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold">{event.title}</h3>
                <p className="text-gray-200">{event.date}</p>
                <Link
                  href={event.link}
                  className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-transform"
                >
                  🎟️ Reserve Ticket
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Glow Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-screen blur-[120px] opacity-30 -top-24 -left-24 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-screen blur-[120px] opacity-30 -bottom-32 -right-32 animate-pulse"></div>
      </div>
    </section>
  );
}

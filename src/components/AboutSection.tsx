'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Image */}
        <motion.div
          className="relative h-[28rem] lg:h-[36rem] rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/sloo.jpeg"
            alt="Sloobeats performing live"
            fill
            sizes='auto'
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent dark:from-purple-800/30" />
        </motion.div>

        {/* Right — Text */}
        <motion.div
          className="flex flex-col justify-center text-center lg:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-50 dark:text-white leading-tight">
            The Heartbeat Behind <span className="text-purple-600 dark:text-purple-400">Sloobeats</span>
          </h2>

          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Sloobeats is more than a DJ — it’s an experience that blends rhythm, culture, and energy.  
            From underground sessions to international stages, every set is a journey through sound and soul.  
            Join the movement that’s redefining the nightlife scene across Africa and beyond.
          </p>

          <div className="mt-10">
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Background Lights */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-screen blur-[120px] opacity-30 -bottom-32 -left-24 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-200 rounded-full mix-blend-screen blur-[120px] opacity-30 -top-24 -right-24 animate-pulse"></div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Instagram, Youtube, Music } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-purple-300/40 rounded-full blur-[120px] opacity-30 -top-24 left-1/2 -translate-x-1/2 animate-pulse"></div>
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl rounded-3xl p-10 lg:p-16 border border-white/30 dark:border-gray-700/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Stay Connected with <span className="text-purple-600 dark:text-purple-400">Sloobeats</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Get exclusive updates, event alerts, and the latest mixes straight to your inbox.
        </p>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:w-auto flex-1 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Join the Vibe 🎧
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-10 flex items-center justify-center gap-8">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://soundcloud.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition"
          >
            <Music className="w-6 h-6" />
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <Youtube className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

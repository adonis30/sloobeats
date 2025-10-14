'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contacts() {
  return (
    <section className="relative py-24 bg-gray-50 dark:bg-gray-950 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-6 text-left">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-purple-600" />
              <p className="text-gray-700 dark:text-gray-200">
                Lusaka Zambia
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-purple-600" />
              <p className="text-gray-700 dark:text-gray-200">+260 975 358 575</p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-purple-600" />
              <p className="text-gray-700 dark:text-gray-200">djsloobeats@gmail.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <textarea
              placeholder="Your Message"
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none h-32"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Background Glow Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-screen blur-[120px] opacity-30 -top-24 -left-24 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-screen blur-[120px] opacity-30 -bottom-32 -right-32 animate-pulse"></div>
      </div>
    </section>
  );
}

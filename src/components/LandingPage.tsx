"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-6rem)] overflow-hidden pb-15">
      {/* Hero Section */}
      <main className="relative flex items-center justify-between min-h-[calc(100vh-6rem)] px-6 lg:px-16 pb-40">
        {/* ↓ add bottom padding to make room for overlapping section */}

        {/* Floating Card (Text + CTA) */}
        <motion.div
          className="relative z-30 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 lg:p-14 max-w-3xl w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ y: 120, opacity: 0 }}
          animate={{
            y: [120, 110, 120], // subtle up-and-down floating
            opacity: 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            transform: "translateX(5%)",
          }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg leading-tight">
            Sloobeats 🎧
          </h1>

          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-purple-600 dark:text-purple-400 drop-shadow-sm">
            Your ultimate music hub
          </h2>

          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-lg">
            Feel the rhythm. Explore curated mixes. Stay tuned for electrifying
            events that move the crowd.
          </p>

          {/* Extra Info / Features */}
          <ul className="mt-6 text-gray-600 dark:text-gray-400 text-base md:text-lg space-y-2 max-w-md list-disc list-inside">
            <li>🎵 Exclusive DJ mixes every week</li>
            <li>📅 Live events across major cities</li>
            <li>🔥 Top trending tracks curated for you</li>
          </ul>

          {/* Animated Multicolor Waveform with Glow */}
          <div className="mt-8 relative flex items-end gap-1 h-14 w-full max-w-md justify-center">
            {/* Pulsing Glow */}
    
            {Array.from({ length: 12 }).map((_, i) => {
              const gradients = [
                "from-pink-500 via-purple-500 to-indigo-500",
                "from-yellow-400 via-red-500 to-pink-500",
                "from-green-400 via-teal-500 to-blue-500",
                "from-purple-400 via-pink-500 to-rose-500",
              ];
              const grad = gradients[i % gradients.length];

              const duration = 0.6 + Math.random() * 0.6;
              const delay = Math.random() * 0.3;

              return (
                <motion.div
                  key={i}
                  className={`w-1.5 bg-gradient-to-t ${grad} rounded`}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay,
                  }}
                />
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto justify-center lg:justify-start">
            <a
              href="/events"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              🎟️ View Events
            </a>
            <a
              href="/mixes"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              🎶 Explore Mixes
            </a>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="absolute right-0 top-0 h-[calc(100vh-4rem)] w-full lg:w-1/2 z-10"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Sloobeats Hero"
            fill
            className="object-cover rounded-bl-[4rem] shadow-2xl"
            style={{ objectPosition: "top right" }}
            priority
          />
        </motion.div>

        {/* Background Blobs */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-screen blur-[120px] opacity-30 -top-24 -left-24 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-pink-200 rounded-full mix-blend-screen blur-[120px] opacity-30 -bottom-32 -right-32 animate-pulse"></div>
        </div>
      </main>
    </div>
  );
}

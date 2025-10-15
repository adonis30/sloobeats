'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/getCurrentUser';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, MusicalNoteIcon, PlayCircleIcon, TicketIcon } from '@heroicons/react/24/solid';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  flyerUrl?: string;
}

interface User {
  id: string;
  name: string | null;
  role: string;
}

export default function FanDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getCurrentUser().then(setUser);

    // Mock events — replace with API fetch
    setEvents([
      {
        id: '1',
        title: 'Sloobeats Live',
        date: '2025-11-01',
        location: 'Luanshya',
        flyerUrl: '/images/event1.jpeg',
      },
      {
        id: '2',
        title: 'DJ Night',
        date: '2025-11-15',
        location: 'Ndola',
      },
    ]);
  }, []);

  if (!user) {
    return <p className="text-center mt-20 text-gray-300 animate-pulse">Loading your dashboard...</p>;
  }

  // Mock stats
  const stats = [
    { label: 'Upcoming Events', value: events.length, icon: CalendarIcon, color: 'from-purple-500 to-pink-500' },
    { label: 'Mixes Played', value: 12, icon: PlayCircleIcon, color: 'from-green-400 to-emerald-600' },
    { label: 'RSVPs', value: 3, icon: TicketIcon, color: 'from-blue-400 to-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white px-6 py-10">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
          🎧 Welcome, {user.name || 'Fan'}!
        </h1>
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          Here’s what’s happening with your Sloobeats experience 🎶
        </p>
      </motion.div>

      {/* Top Summary Row */}
      <motion.div
        className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} shadow-lg flex items-center justify-between`}
          >
            <div>
              <p className="text-sm uppercase text-white/80 tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <stat.icon className="w-7 h-7 text-white" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Events Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-purple-400" />
            Upcoming Events
          </h2>
          <Link
            href="/site/mixes"
            className="text-sm text-purple-400 hover:text-pink-400 transition"
          >
            🎵 View Mixes
          </Link>
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-gray-800/70 border border-white/10 rounded-2xl shadow-lg hover:shadow-purple-500/20 overflow-hidden backdrop-blur-sm"
            >
              {/* Flyer */}
              {event.flyerUrl ? (
                <div className="relative w-full h-52">
                  <Image
                    src={event.flyerUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex items-center justify-center h-52 bg-gradient-to-br from-purple-800 to-pink-700 text-white">
                  <MusicalNoteIcon className="w-12 h-12 opacity-80" />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-400 gap-3">
                  <MapPinIcon className="w-4 h-4 text-pink-400" />
                  <span>{event.location}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 py-2 rounded-lg font-semibold text-white shadow-md transition-all">
                  RSVP
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

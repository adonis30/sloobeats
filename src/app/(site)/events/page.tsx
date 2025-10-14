'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '@/components/EventCard';

const sampleEvents = [
  {
    title: 'Club Night Vibes',
    date: 'Dec 20, 2025',
    location: 'Luanshya, Zambia',
    flyerUrl: '/images/mix1.jpeg',
    link: '#',
  },
  {
    title: 'Sloobeats Live',
    date: 'Jan 10, 2026',
    location: 'Ndola, Zambia',
    flyerUrl: '/images/mix2.jpeg',
    link: '#',
  },
  {
    title: 'Electric Beats Festival',
    date: 'Feb 14, 2026',
    location: 'Lusaka, Zambia',
    flyerUrl: '/images/mix3.jpeg',
    link: '#',
  },
  {
    title: 'Retro Night Party',
    date: 'Sept 10, 2024',
    location: 'Kitwe, Zambia',
    flyerUrl: '/images/mix4.jpeg',
    link: '#',
  },
];

type FilterType = 'all' | 'upcoming' | 'past';

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  // Helper function to categorize events
  const filteredEvents = sampleEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();

    if (filter === 'upcoming') return eventDate >= today;
    if (filter === 'past') return eventDate < today;
    return true;
  });

  const tabs: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-500 mb-10 text-center">
        📅 Upcoming & Past Events
      </h1>

      {/* Filter Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative flex bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`relative px-6 py-2 text-sm font-semibold rounded-full transition ${
                filter === tab.value
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-500'
              }`}
            >
              {filter === tab.value && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, idx) => (
              <EventCard key={idx} {...event} />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 col-span-full mt-8"
            >
              No {filter} events found.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

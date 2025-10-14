'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/getCurrentUser';
import Link from 'next/link';
import Image from 'next/image';

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
        flyerUrl: '/images/flyer1.jpg',
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
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🎧 Welcome, {user.name || 'Fan'}!</h1>
      <h2 className="text-2xl mb-4">Upcoming Events</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {event.flyerUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={event.flyerUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={event.id === '1'}
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-300">
                {event.location} • {new Date(event.date).toLocaleDateString()}
              </p>
              <button className="mt-3 w-full bg-purple-500 hover:bg-purple-600 transition py-2 rounded text-white">
                RSVP
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/site/mixes"
        className="block mt-8 text-center text-purple-400 hover:underline"
      >
        🎵 See all mixes
      </Link>
    </div>
  );
}

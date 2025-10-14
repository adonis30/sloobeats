'use client';

import EventCard from '@/components/EventCard';

const sampleEvents = [
  {
    title: 'Club Night Vibes',
    date: 'Dec 20, 2025',
    location: 'Luanshya, Zambia',
    flyerUrl: '/images/image1.jpg',
    link: '#',
  },
  {
    title: 'Sloobeats Live',
    date: 'Jan 10, 2026',
    location: 'Ndola, Zambia',
    flyerUrl: '/images/image2.jpg',
    link: '#',
  },
  {
    title: 'Electric Beats Festival',
    date: 'Feb 14, 2026',
    location: 'Lusaka, Zambia',
    flyerUrl: '/images/image3.jpg',
    link: '#',
  },
];

export default function EventsPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">📅 Upcoming & Past Events</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleEvents.map((event, idx) => (
          <EventCard key={idx} {...event} />
        ))}
      </div>
    </div>
  );
}

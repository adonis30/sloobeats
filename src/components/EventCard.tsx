'use client';

import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  flyerUrl: string;
  link?: string;
}

export default function EventCard({ title, date, location, flyerUrl, link }: EventCardProps) {
  return (
    <Link href={link || '#'} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
      <Image
        src={flyerUrl}
        alt={title}
        width={400}
        height={250}
        className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">{date} • {location}</p>
      </div>
    </Link>
  );
}

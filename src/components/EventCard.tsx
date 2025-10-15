'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import EventModal from './EventModal';


interface EventCardProps {
  title: string;
  date: string;
  location: string;
  flyerUrl: string;
  link: string;
}

export default function EventCard({
  title,
  date,
  location,
  flyerUrl,
  link,
}: EventCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-3xl shadow-lg cursor-pointer group"
        layoutId={`card-${title}`} // 🔥 Shared transition id
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div layoutId={`image-${title}`} className="relative h-80 w-full">
          <Image
            src={flyerUrl}
            alt={title}
            fill
            sizes='auto'
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
          <p className="text-gray-300">{date}</p>
        </div>
      </motion.div>

      {open && (
        <EventModal
          title={title}
          date={date}
          location={location}
          flyerUrl={flyerUrl}
          link={link}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

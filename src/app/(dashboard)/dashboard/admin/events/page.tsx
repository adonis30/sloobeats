'use client';

import React from "react";
import Image from "next/image";
import { Calendar, Pencil, Trash } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  flyerUrl?: string;
};

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Summer Beats Festival",
    date: "2025-11-01",
    location: "Ndola Open Air",
    flyerUrl: "https://via.placeholder.com/300x200.png?text=Summer+Beats",
  },
  {
    id: "2",
    title: "Club Night Extravaganza",
    date: "2025-12-15",
    location: "Lusaka Club X",
    flyerUrl: "https://via.placeholder.com/300x200.png?text=Club+Night",
  },
];

export default function AdminEvents() {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">📅 Manage Events</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition cursor-pointer flex flex-col"
          >
            {/* Event Flyer */}
            {event.flyerUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={event.flyerUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            )}

            {/* Event Details */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-300 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {event.date}
              </p>
              <p className="text-gray-300 mb-4">{event.location}</p>

              {/* Action Buttons */}
              <div className="mt-auto flex justify-end gap-3">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg transition">
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg transition">
                  <Trash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

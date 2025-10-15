'use client';

import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Pencil, Trash2, Plus } from "lucide-react";

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
    flyerUrl: "/images/event1.jpeg",
  },
  {
    id: "2",
    title: "Club Night Extravaganza",
    date: "2025-12-15",
    location: "Lusaka Club X",
    flyerUrl: "/images/event2.jpeg",
  },
];

export default function AdminEvents() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-purple-400 drop-shadow-md">
          📅 Manage Events
        </h1>

        <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl transition shadow-lg hover:shadow-purple-700/30 font-medium">
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            className="group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden shadow-md hover:shadow-purple-700/20 hover:-translate-y-1 transform transition-all duration-300 flex flex-col"
          >
            {/* Flyer */}
            {event.flyerUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={event.flyerUrl}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
            )}

            {/* Details */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-2 text-white/90 group-hover:text-purple-400 transition">
                {event.title}
              </h2>

              <div className="text-gray-300 text-sm space-y-1 mb-4">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {event.location}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-auto flex justify-between">
                <button className="flex items-center gap-2 bg-blue-600/90 hover:bg-blue-500 px-4 py-2 rounded-lg transition text-sm font-medium shadow-md">
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex items-center gap-2 bg-red-600/90 hover:bg-red-500 px-4 py-2 rounded-lg transition text-sm font-medium shadow-md">
                  <Trash2 className="w-4 h-4" />
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

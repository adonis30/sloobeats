'use client';

import React from "react";
import ReactPlayer from "react-player";
import { Pencil, Trash } from "lucide-react";

// --------------------
// Type Definitions
// --------------------
type Mix = {
  id: string;
  title: string;
  genre: string;
  isPremium: boolean;
  audioUrl: string;
};

// --------------------
// Sample Data
// --------------------
const sampleMixes: Mix[] = [
  {
    id: "1",
    title: "Deep House Sunset",
    genre: "Deep House",
    isPremium: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Club Vibes",
    genre: "House",
    isPremium: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Chill Beats",
    genre: "Chillout",
    isPremium: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

// --------------------
// Component
// --------------------
export default function AdminMixes(): React.ReactElement {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🎵 Manage Mixes</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleMixes.map((mix: Mix) => (
          <div
            key={mix.id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition cursor-pointer flex flex-col"
          >
            {/* Title and Premium Badge */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">{mix.title}</h2>
              {mix.isPremium && (
                <span className="text-sm bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-semibold">
                  Premium
                </span>
              )}
            </div>

            {/* Genre */}
            <p className="text-gray-300 mb-3">{mix.genre}</p>

            {/* Audio Player */}
            <div className="mb-4">
              <ReactPlayer
                {...({ url: mix.audioUrl, controls: true, width: "100%", height: "50px" })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg transition"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                type="button"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg transition"
              >
                <Trash className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

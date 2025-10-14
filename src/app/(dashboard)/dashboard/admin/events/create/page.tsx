'use client';

import { useState } from "react";

export default function UploadEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [flyer, setFlyer] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFlyer(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement event upload API
    console.log({ title, date, location, flyer });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">📅 Upload New Event</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Event Title */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Event Date */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Event Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Event Location */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Flyer Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Event Flyer</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          {flyer && (
            <p className="mt-2 text-green-400 font-medium">Selected: {flyer.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl font-bold text-white hover:scale-105 transition transform"
        >
          Upload Event
        </button>
      </form>
    </div>
  );
}

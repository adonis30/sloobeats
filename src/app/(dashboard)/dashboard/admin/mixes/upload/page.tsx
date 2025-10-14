'use client';

import { useState } from "react";

export default function UploadMix() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAudioFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement upload logic with API + Stripe for premium mixes
    console.log({ title, genre, isPremium, audioFile });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">🎵 Upload New Mix</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Mix Title */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Mix Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter mix title"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select genre</option>
            <option value="House">House</option>
            <option value="Techno">Techno</option>
            <option value="Deep House">Deep House</option>
            <option value="Chillout">Chillout</option>
            <option value="Trap">Trap</option>
          </select>
        </div>

        {/* Premium Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="w-5 h-5 accent-yellow-500"
          />
          <label className="font-semibold">Premium Mix (Paid Content)</label>
        </div>

        {/* Audio File Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          {audioFile && (
            <p className="mt-2 text-green-400 font-medium">Selected: {audioFile.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl font-bold text-white hover:scale-105 transition transform"
        >
          Upload Mix
        </button>
      </form>
    </div>
  );
}

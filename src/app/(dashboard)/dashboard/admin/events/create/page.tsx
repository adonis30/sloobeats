'use client';

import { useState } from "react";
import { Upload, Calendar, MapPin, ImagePlus } from "lucide-react";

export default function UploadEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [flyer, setFlyer] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFlyer(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement event upload API
    console.log({ title, date, location, flyer });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center p-8">
      {/* Header */}
      <div className="max-w-3xl w-full flex flex-col items-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-400 mb-2 drop-shadow-lg">
          📅 Upload New Event
        </h1>
        <p className="text-gray-400 text-center text-sm">
          Fill in event details and upload a promotional flyer.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-xl space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-200">
            Event Title
          </label>
          <div className="flex items-center gap-3 bg-gray-700/60 rounded-lg px-3">
            <Upload className="w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="w-full p-3 bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-200">
            Event Date
          </label>
          <div className="flex items-center gap-3 bg-gray-700/60 rounded-lg px-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-transparent border-none focus:outline-none text-gray-100"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-200">
            Location
          </label>
          <div className="flex items-center gap-3 bg-gray-700/60 rounded-lg px-3">
            <MapPin className="w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-3 bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Flyer Upload */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-200">
            Event Flyer
          </label>

          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-xl p-8 cursor-pointer transition bg-gray-700/40 hover:bg-gray-700/60">
            <ImagePlus className="w-12 h-12 text-purple-400 mb-3" />
            <span className="text-gray-300 text-sm">
              {flyer ? flyer.name : "Click to upload or drag an image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="mt-4 relative w-full h-56 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl font-bold text-white hover:scale-[1.02] transition-transform shadow-lg hover:shadow-purple-700/30"
        >
          Upload Event
        </button>
      </form>
    </div>
  );
}

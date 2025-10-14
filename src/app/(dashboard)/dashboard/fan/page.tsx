'use client';

import React from "react";
import { User, MessageCircle, CalendarCheck } from "lucide-react";

type Comment = {
  id: string;
  user: string;
  text: string;
  mixTitle?: string;
};

type RSVP = {
  id: string;
  user: string;
  eventTitle: string;
  status: string;
};

type Follower = {
  id: string;
  name: string;
  joinedAt: string;
};

const comments: Comment[] = [
  { id: "1", user: "Alice", text: "Loved this mix!", mixTitle: "Deep House Sunset" },
  { id: "2", user: "Bob", text: "Can't wait for the next event!", mixTitle: "Club Vibes" },
];

const rsvps: RSVP[] = [
  { id: "1", user: "Charlie", eventTitle: "Summer Beats Festival", status: "Going" },
  { id: "2", user: "Dana", eventTitle: "Club Night Extravaganza", status: "Interested" },
];

const followers: Follower[] = [
  { id: "1", name: "Eve", joinedAt: "2025-10-01" },
  { id: "2", name: "Frank", joinedAt: "2025-10-05" },
];

export default function FanInteractions() {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">👥 Fan Interactions</h1>

      {/* Comments Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle /> Comments
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-gray-800 p-4 rounded-2xl shadow hover:scale-105 transition transform"
            >
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">{c.user}</span> on <span className="italic">{c.mixTitle}</span>
              </p>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RSVPs Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <CalendarCheck /> Event RSVPs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-3">User</th>
                <th className="p-3">Event</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id} className="border-b border-gray-600 hover:bg-gray-800 transition">
                  <td className="p-3">{r.user}</td>
                  <td className="p-3">{r.eventTitle}</td>
                  <td className={`p-3 font-semibold ${r.status === "Going" ? "text-green-400" : "text-yellow-400"}`}>
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Followers Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <User /> Followers
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {followers.map((f) => (
            <div
              key={f.id}
              className="bg-gray-800 p-4 rounded-2xl shadow hover:scale-105 transition transform flex justify-between items-center"
            >
              <span>{f.name}</span>
              <span className="text-gray-400 text-sm">Joined: {f.joinedAt}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

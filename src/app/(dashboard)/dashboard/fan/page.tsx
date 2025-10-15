'use client';

import React from "react";
import { motion } from "framer-motion";
import { User, MessageCircle, CalendarCheck } from "lucide-react";

// ------------------------
//  Types
// ------------------------
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

// ------------------------
//  Mock Data
// ------------------------
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

// ------------------------
//  Animation Variants
// ------------------------
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
};

// ------------------------
//  Component
// ------------------------
export default function FanInteractions() {
  return (
    <motion.div
      className="min-h-screen p-8 bg-gray-900 text-white"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.h1
        className="text-3xl font-bold mb-6"
        variants={fadeUp}
      >
        👥 Fan Interactions
      </motion.h1>

      {/* COMMENTS SECTION */}
      <motion.section className="mb-8" variants={fadeUp}>
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
        >
          <MessageCircle /> Comments
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          variants={container}
        >
          {comments.map((c) => (
            <motion.div
              key={c.id}
              variants={fadeUp}
              className="bg-gray-800 p-4 rounded-2xl shadow hover:scale-105 transition transform"
            >
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">{c.user}</span> on{" "}
                <span className="italic">{c.mixTitle}</span>
              </p>
              <p>{c.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* RSVPS SECTION */}
      <motion.section className="mb-8" variants={fadeUp}>
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
        >
          <CalendarCheck /> Event RSVPs
        </motion.h2>
        <div className="overflow-x-auto">
          <motion.table
            className="w-full text-left border-collapse"
            variants={container}
          >
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-3">User</th>
                <th className="p-3">Event</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <motion.tbody variants={container}>
              {rsvps.map((r) => (
                <motion.tr
                  key={r.id}
                  variants={fadeUp}
                  className="border-b border-gray-600 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{r.user}</td>
                  <td className="p-3">{r.eventTitle}</td>
                  <td
                    className={`p-3 font-semibold ${
                      r.status === "Going" ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {r.status}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
        </div>
      </motion.section>

      {/* FOLLOWERS SECTION */}
      <motion.section variants={fadeUp}>
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
        >
          <User /> Followers
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          variants={container}
        >
          {followers.map((f) => (
            <motion.div
              key={f.id}
              variants={fadeUp}
              className="bg-gray-800 p-4 rounded-2xl shadow hover:scale-105 transition transform flex justify-between items-center"
            >
              <span>{f.name}</span>
              <span className="text-gray-400 text-sm">
                Joined: {f.joinedAt}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

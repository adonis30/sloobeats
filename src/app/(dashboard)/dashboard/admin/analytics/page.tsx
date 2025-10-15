'use client';

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

// =============================
// 📊 Sample Analytics Data
// =============================
const mixPlaysData = [
  { date: "Oct 1", plays: 120 },
  { date: "Oct 2", plays: 210 },
  { date: "Oct 3", plays: 180 },
  { date: "Oct 4", plays: 250 },
  { date: "Oct 5", plays: 300 },
];

const likesData = [
  { mix: "Deep House Sunset", likes: 150 },
  { mix: "Club Vibes", likes: 200 },
  { mix: "Chill Beats", likes: 120 },
];

const revenueData = [
  { mix: "Deep House Sunset", revenue: 120 },
  { mix: "Club Vibes", revenue: 350 },
  { mix: "Chill Beats", revenue: 80 },
];

const COLORS = ["#a855f7", "#22d3ee", "#fbbf24"];

// =============================
// 🎬 Motion Variants
// =============================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const, // ✅ fix type error cleanly
    },
  },
};

// =============================
// ⚡ Main Component
// =============================
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        📊 Dashboard Analytics
      </motion.h1>

      {/* Chart Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Line Chart */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/60 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-pink-400">
            Mix Plays Over Time
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mixPlaysData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#bbb" />
              <YAxis stroke="#bbb" />
              <Tooltip
                contentStyle={{
                  background: "#1f1f1f",
                  borderRadius: "10px",
                  border: "1px solid #333",
                }}
              />
              <Line
                type="monotone"
                dataKey="plays"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: "#f472b6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/60 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Mix Likes
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={likesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="mix" stroke="#bbb" />
              <YAxis stroke="#bbb" />
              <Tooltip
                contentStyle={{
                  background: "#1f1f1f",
                  borderRadius: "10px",
                  border: "1px solid #333",
                }}
              />
              <Bar dataKey="likes" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/60 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md p-6 md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            Revenue per Mix ($)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="revenue"
                nameKey="mix"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {revenueData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{
                  background: "#1f1f1f",
                  borderRadius: "10px",
                  border: "1px solid #333",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}

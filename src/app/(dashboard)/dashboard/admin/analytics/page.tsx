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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Analytics</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mix Plays Line Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Mix Plays Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mixPlaysData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="plays" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mix Likes Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Mix Likes</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={likesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="mix" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="likes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Revenue per Mix ($)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="revenue"
                nameKey="mix"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

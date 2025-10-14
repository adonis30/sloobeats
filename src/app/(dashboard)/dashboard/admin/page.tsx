'use client';

import Link from "next/link";
import { Calendar, Music, BarChart3 } from "lucide-react";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight">🎧 Admin Dashboard</h1>
        <p className="text-gray-400">Welcome back, DJ!</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Manage Events */}
        <Link
          href="/dashboard/admin/events"
          className="bg-gradient-to-br from-purple-700 to-purple-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform transform cursor-pointer flex flex-col"
        >
          <div className="flex items-center mb-4">
            <Calendar className="w-8 h-8 mr-3 text-white" />
            <h2 className="text-xl font-bold text-white">Manage Events</h2>
          </div>
          <p className="text-gray-200">Add, edit, or delete events</p>
        </Link>

        {/* Manage Mixes */}
        <Link
          href="/dashboard/admin/mixes"
          className="bg-gradient-to-br from-indigo-700 to-indigo-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform transform cursor-pointer flex flex-col"
        >
          <div className="flex items-center mb-4">
            <Music className="w-8 h-8 mr-3 text-white" />
            <h2 className="text-xl font-bold text-white">Manage Mixes</h2>
          </div>
          <p className="text-gray-200">Upload new mixes or set premium content</p>
        </Link>

        {/* Analytics */}
        <Link
          href="/dashboard/admin/analytics"
          className="bg-gradient-to-br from-teal-700 to-teal-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform transform cursor-pointer flex flex-col"
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="w-8 h-8 mr-3 text-white" />
            <h2 className="text-xl font-bold text-white">Analytics</h2>
          </div>
          <p className="text-gray-200">View plays, likes, comments, and purchases</p>
        </Link>
      </div>
    </div>
  );
}

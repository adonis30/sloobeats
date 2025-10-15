'use client';

import { ReactNode } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Bell, Search, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gray-900/60 backdrop-blur-md sticky top-0 z-50">
          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-full w-full max-w-md">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mixes, events, or fans..."
              className="bg-transparent focus:outline-none text-sm placeholder-gray-500 w-full"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="relative p-2 rounded-full hover:bg-gray-800 transition"
            >
              <Bell className="w-6 h-6 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer hover:text-pink-400 transition"
            >
              <UserCircle className="w-7 h-7 text-gray-300" />
              <span className="hidden sm:inline text-sm font-medium">Admin</span>
            </motion.div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900/50 rounded-2xl border border-white/10 shadow-xl p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

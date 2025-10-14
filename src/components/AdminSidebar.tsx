'use client';

import Link from 'next/link';
import { Music, Calendar, BarChart2, User } from 'lucide-react';

const navItems = [
  { name: 'Mixes', href: '/dashboard/admin/mixes', icon: <Music className="w-5 h-5" /> },
  { name: 'Events', href: '/dashboard/admin/events', icon: <Calendar className="w-5 h-5" /> },
  { name: 'Analytics', href: '/dashboard/admin/analytics', icon: <BarChart2 className="w-5 h-5" /> },
  { name: 'Fan Interactions', href: '/dashboard/admin/fans', icon: <User className="w-5 h-5" /> },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-center">Sloobeats Admin</h1>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition font-medium"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition font-medium text-red-500"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
}

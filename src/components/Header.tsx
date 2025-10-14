'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Mixes', href: '/mixes' },
  { name: 'Gallery', href: '/gallery' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/20 dark:bg-black/30 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-extrabold text-white dark:text-purple-400">
          Sloobeats 🎧
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white dark:text-gray-200 font-medium hover:underline hover:text-purple-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <SunIcon className="w-5 h-5 text-white" /> : <MoonIcon className="w-5 h-5 text-white" />}
          </button>
          <Link
            href="/login"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-white/20 dark:hover:bg-gray-700 transition"
        >
          {menuOpen ? <XMarkIcon className="w-6 h-6 text-white" /> : <Bars3Icon className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-black/70 backdrop-blur-md flex flex-col items-center gap-6 pt-32 text-center z-50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-medium hover:text-purple-400 transition"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className="px-8 py-3 border border-white rounded-full text-white hover:bg-white/20 transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}

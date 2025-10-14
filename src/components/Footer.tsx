'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-6 py-8 mt-12 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Sloobeats. All rights reserved.</p>

        <div className="flex items-center gap-4 text-sm md:text-base">
          <span>Follow us:</span>
          <Link 
            href="#" 
            className="text-purple-400 hover:text-purple-600 transition-colors"
          >
            Instagram
          </Link>
          <Link 
            href="#" 
            className="text-purple-400 hover:text-purple-600 transition-colors"
          >
            Facebook
          </Link>
          <Link 
            href="#" 
            className="text-purple-400 hover:text-purple-600 transition-colors"
          >
            Twitter
          </Link>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Developed by Onisy Ndhlovu
      </p>
    </footer>
  );
}

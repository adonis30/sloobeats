import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NowPlayingBar from "@/components/NowPlayingBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sloobeats — The Best DJ in Town",
  description: "Discover mixes, events, and the electrifying world of Sloobeats.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-[5rem] pb-[6rem] px-6 md:px-12 overflow-x-hidden">
        {children}
      </main>

      {/* Footer (scrolls with content) */}
      <Footer />

      {/* Fixed Now Playing Bar */}
      <NowPlayingBar />
    </div>
  );
}

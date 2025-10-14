// src/app/(site)/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sloobeats — The Best DJ in Town",
  description: "Discover mixes, events, and the electrifying world of Sloobeats.",
  openGraph: {
    title: "Sloobeats — The Best DJ in Town",
    description: "Catch upcoming events, stream fresh mixes, and follow the vibe.",
    url: "https://sloobeats.com", 
    siteName: "Sloobeats",
    images: [
      {
        url: "public/images/image1.jpg", 
        width: 1200,
        height: 630,
        alt: "Sloobeats DJ Promo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sloobeats — The Best DJ in Town",
    description: "Stream mixes, follow events, and join the beat.",
    images: ["https://sloobeats.com/og-image.jpg"],
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-900  dark:text-gray-50"> 
      {/* Header */}
      <Header />

      {/* Main content: padding-top accounts for fixed header height */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-24 px-6 md:px-12">
        {children}
      </main>

      <Footer />
    </div>
  );
}

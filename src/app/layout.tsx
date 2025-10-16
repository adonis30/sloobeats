// src/app/layout.tsx
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import NowPlayingBar from "@/components/NowPlayingBar";

export const metadata = {
  title: "Sloobeats",
  description: "The best DJ in town",
 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white font-sans relative min-h-screen">
        {/* Wrap everything in the player provider */}
        <PlayerProvider>
          {children}

          {/* Global Now Playing bar (fixed bottom) */}
          {/* //<NowPlayingBar /> */}
        </PlayerProvider>
      </body>
    </html>
  );
}

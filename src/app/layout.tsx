// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Sloobeats",
  description: "The best DJ in town",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}

'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';

interface MixCardProps {
  title: string;
  genre: string;
  audioUrl: string;
  premium?: boolean;
}

export default function MixCard({ title, genre, audioUrl, premium }: MixCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group bg-gray-900 rounded-xl shadow-lg p-4 hover:shadow-2xl transition flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {premium && <span className="text-yellow-400 font-semibold">Premium</span>}
      </div>
      <p className="text-gray-400">{genre}</p>

      <ReactPlayer
        {...({
          url: audioUrl,
          controls: true,
          width: "100%",
          height: "50px",
          playing,
          onPlay: () => setPlaying(true),
          onPause: () => setPlaying(false),
        })}
      />
    </div>
  );
}

'use client';

import { usePlayer } from '@/context/PlayerContext';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface MixCardProps {
  title: string;
  genre: string;
  url: string;        // ✅ renamed
  coverUrl?: string;
  premium?: boolean;
}

export default function MixCard({ title, genre, url, coverUrl, premium }: MixCardProps) {
  const { currentTrack, playing, playTrack, togglePlay } = usePlayer();

  const isCurrent = currentTrack?.url === url;
  const isPlaying = isCurrent && playing;

  const handlePlay = () => {
    if (isCurrent) togglePlay();
    else playTrack({ title, genre, url, coverUrl });
  };

  return (
    <div className="group bg-gray-900 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all flex flex-col gap-4 hover:scale-[1.03]">
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src={coverUrl || '/images/default-cover.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
        >
          {isPlaying ? (
            <PauseIcon className="w-12 h-12 text-white" />
          ) : (
            <PlayIcon className="w-12 h-12 text-white" />
          )}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>
        {premium && (
          <span className="text-yellow-400 font-semibold text-sm bg-yellow-900/20 px-2 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>

      <p className="text-gray-400 text-sm">{genre}</p>
    </div>
  );
}

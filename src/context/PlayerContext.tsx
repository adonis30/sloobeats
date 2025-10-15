'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import dynamic from 'next/dynamic';

// Minimal type for ReactPlayer instance
interface ReactPlayerInstance {
  seekTo: (amount: number, type?: 'seconds' | 'fraction') => void;
}

// Minimal props for ReactPlayer component
interface ReactPlayerProps {
  url: string;
  playing?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  onDuration?: (duration: number) => void;
  onProgress?: (progress: { playedSeconds: number }) => void;
  onEnded?: () => void;
  config?: {
    youtube?: {
      playerVars?: Record<string, number | string>;
    };
  };
}

// Dynamically import ReactPlayer (avoid SSR issues)
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
}) as unknown as React.ForwardRefExoticComponent<
  ReactPlayerProps & React.RefAttributes<ReactPlayerInstance>
>;

export interface Track {
  title: string;
  genre: string;
  url: string;
  coverUrl?: string;
  premium?: boolean;
}

interface PlayerContextType {
  currentTrack: Track | null;
  playing: boolean;
  progress: number;
  duration: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seekTo: (seconds: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<ReactPlayerInstance | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => setPlaying((prev) => !prev);

  const seekTo = (seconds: number) => {
    playerRef.current?.seekTo(seconds, 'seconds');
  };

  useEffect(() => {
    setProgress(0);
    setDuration(0);
  }, [currentTrack]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playing,
        progress,
        duration,
        playTrack,
        togglePlay,
        seekTo,
      }}
    >
      {children}

      {currentTrack && (
        <div className="hidden">
          <ReactPlayer
            ref={playerRef}
            url={currentTrack.url}
            playing={playing}
            controls={false}
            width="0"
            height="0"
            onDuration={(d) => setDuration(d)}
            onProgress={(state) => setProgress(state.playedSeconds)}
            onEnded={() => setPlaying(false)}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              },
            }}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}

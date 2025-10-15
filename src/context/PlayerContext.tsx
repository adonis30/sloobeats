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
import YouTube from 'react-youtube';
import type { YouTubePlayer } from 'react-youtube';

interface ReactPlayerInstance {
  seekTo: (amount: number, type?: 'seconds' | 'fraction') => void;
}

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
}) as unknown as React.ForwardRefExoticComponent<
  {
    url: string;
    playing?: boolean;
    controls?: boolean;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    onDuration?: (duration: number) => void;
    onProgress?: (progress: { playedSeconds: number }) => void;
    onEnded?: () => void;
    config?: {
      file?: { forceAudio?: boolean };
    };
  } & React.RefAttributes<ReactPlayerInstance>
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
  muted: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  seekTo: (seconds: number) => void;
  skipForward: (seconds: number) => void;
  skipBackward: (seconds: number) => void;
  stopPlayback: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<ReactPlayerInstance | null>(null);
  const ytRef = useRef<YouTubePlayer | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);

  const isYouTube =
    currentTrack?.url.includes('youtube.com') ||
    currentTrack?.url.includes('youtu.be');

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    setPlaying((prev) => {
      const next = !prev;
      if (isYouTube && ytRef.current) {
        next ? ytRef.current.playVideo() : ytRef.current.pauseVideo();
      }
      return next;
    });
  };

  const toggleMute = () => setMuted((prev) => !prev);

  const seekTo = (seconds: number) => {
    if (isYouTube) {
      ytRef.current?.seekTo(seconds, true);
    } else {
      playerRef.current?.seekTo(seconds, 'seconds');
    }
  };

  const skipForward = (seconds: number) => {
    seekTo(progress + seconds);
  };

  const skipBackward = (seconds: number) => {
    seekTo(Math.max(progress - seconds, 0));
  };

  const stopPlayback = () => {
    setPlaying(false);
    setProgress(0);
    if (isYouTube && ytRef.current) {
      ytRef.current.pauseVideo();
      ytRef.current.seekTo(0, true);
    } else {
      playerRef.current?.seekTo(0, 'seconds');
    }
  };

  useEffect(() => {
    setProgress(0);
    setDuration(0);
  }, [currentTrack]);

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : '';
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playing,
        progress,
        duration,
        muted,
        playTrack,
        togglePlay,
        toggleMute,
        seekTo,
        skipForward,
        skipBackward,
        stopPlayback,
      }}
    >
      {children}

      {currentTrack && (
        <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          {isYouTube ? (
            <YouTube
              videoId={extractYouTubeId(currentTrack.url)}
              opts={{
                height: '0',
                width: '0',
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
              onEnd={() => setPlaying(false)}
              onReady={(e) => {
                ytRef.current = e.target;
                if (!playing) e.target.pauseVideo();
              }}
            />
          ) : (
            <ReactPlayer
              ref={playerRef}
              url={currentTrack.url}
              playing={playing}
              controls={false}
              width="0"
              height="0"
              muted={muted}
              onDuration={(d) => setDuration(d)}
              onProgress={(state) => setProgress(state.playedSeconds)}
              onEnded={() => setPlaying(false)}
              config={{
                file: { forceAudio: true },
              }}
            />
          )}
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

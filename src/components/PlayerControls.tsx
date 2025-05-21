// src/components/PlayerControls.tsx
import { useEffect, useRef, useState } from 'react';

type Props = {
  videoId: string | null;
};

const PlayerControls = ({ videoId }: Props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0); // %
  const [duration, setDuration] = useState(0); // 秒
  const [currentTime, setCurrentTime] = useState(0); // 秒

  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!videoId) return;

    const checkPlayer = setInterval(() => {
      if ((window as any).YT && (window as any).YT.get) {
        clearInterval(checkPlayer);

        const iframe = document.querySelector('iframe');
        if (!iframe) return;

        playerRef.current = (window as any).YT.get(iframe.id);

        setDuration(playerRef.current.getDuration());
        setIsMuted(playerRef.current.isMuted?.());
        setIsPlaying(playerRef.current.getPlayerState() === 1);

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          const current = playerRef.current.getCurrentTime?.() || 0;
          const total = playerRef.current.getDuration?.() || 0;
          setCurrentTime(current);
          if (total > 0) setProgress((current / total) * 100);
        }, 1000);
      }
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoId]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player || !duration) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    player.seekTo(newTime, true);
    setProgress(parseFloat(e.target.value));
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '16px 24px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        zIndex: 10,
        width: '90%',
        maxWidth: '500px',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={togglePlay} style={buttonStyle}>
          {isPlaying ? '⏸ Pause' : '▶️ Play'}
        </button>
        <button onClick={toggleMute} style={buttonStyle}>
          {isMuted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        style={sliderStyle}
      />

      <div style={{ fontSize: '14px' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  background: 'transparent',
  color: 'white',
  fontSize: '16px',
  border: 'none',
  cursor: 'pointer',
};

const sliderStyle: React.CSSProperties = {
  width: '100%',
  appearance: 'none',
  height: '6px',
  borderRadius: '3px',
  background: '#fff',
  outline: 'none',
  cursor: 'pointer',
};

export default PlayerControls;

// src/components/PlayerControls.tsx
import { useEffect, useRef, useState } from 'react';

type Props = {
  videoId: string | null;
};

const PlayerControls = ({ videoId }: Props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoId) return;

    const checkPlayer = setInterval(() => {
      if ((window as any).YT && (window as any).YT.get) {
        clearInterval(checkPlayer);

        const iframe = document.querySelector('iframe');
        if (!iframe) return;

        playerRef.current = (window as any).YT.get(iframe.id);

        // 状態更新
        setIsPlaying(!playerRef.current.isPaused?.());
        setIsMuted(playerRef.current.isMuted?.());
      }
    }, 500);

    return () => clearInterval(checkPlayer);
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

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '10px 20px',
        borderRadius: '30px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <button onClick={togglePlay} style={buttonStyle}>
        {isPlaying ? '⏸ Pause' : '▶️ Play'}
      </button>
      <button onClick={toggleMute} style={buttonStyle}>
        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
      </button>
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

export default PlayerControls;

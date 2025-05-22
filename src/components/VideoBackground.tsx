import { useEffect, useRef } from 'react';

type Props = {
  videoId: string;
};

const VideoBackground = ({ videoId }: Props) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayer = useRef<any>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).YT && (window as any).YT.Player) {
          resolve();
        } else {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.body.appendChild(tag);
          (window as any).onYouTubeIframeAPIReady = () => resolve();
        }
      });
    };

    const initPlayer = async () => {
      await loadYouTubeAPI();

      if (!playerRef.current) return;

      if (ytPlayer.current && ytPlayer.current.destroy) {
        ytPlayer.current.destroy();
      }

      ytPlayer.current = new (window as any).YT.Player(playerRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1,
          playlist: videoId,
          mute: 1,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.unMute(); // ミュート解除
            event.target.playVideo();
          },
        },
      });
    };

    initPlayer();

    return () => {
      if (ytPlayer.current && ytPlayer.current.destroy) {
        ytPlayer.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    >
      <div
        ref={playerRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(8px) brightness(0.8)',
          transform: 'scale(1.2)',
        }}
      />
    </div>
  );
};

export default VideoBackground;

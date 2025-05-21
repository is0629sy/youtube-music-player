// src/components/VideoBackground.tsx
import { useEffect, useRef } from 'react';

type Props = {
  videoId: string;
};

const VideoBackground = ({ videoId }: Props) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // グローバル関数としてAPIロード時に呼ばれるようにする
    (window as any).onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) return;

      new (window as any).YT.Player(playerRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1,
          playlist: videoId, // loop再生にはplaylist指定が必要
          mute: 1,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    };

    return () => {
      // クリーンアップ（前の動画を削除）
      if (playerRef.current) {
        playerRef.current.innerHTML = '';
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
        opacity: 0.3, // 半透明感
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

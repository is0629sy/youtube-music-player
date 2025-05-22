import { useState } from 'react';
import Search from './components/Search';
import VideoBackground from './components/VideoBackground';
import PlayerControls from './components/PlayerControls';

function App() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoSelect = (id: string) => {
    setVideoId(id);
    setIsPlaying(true); // 新しい動画が選択されたら再生状態に
  };

  return (
    <div className="app-container">
      <Search onVideoSelect={handleVideoSelect} />
      {videoId && <VideoBackground videoId={videoId} />}
      <PlayerControls
        videoId={videoId}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;

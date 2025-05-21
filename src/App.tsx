import { useState } from 'react';
import SearchBar from './components/SearchBar';
import VideoBackground from './components/VideoBackground';
import PlayerControls from './components/PlayerControls';

function App() {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <div className="app-container">
      <SearchBar onSearch={(id: string) => setVideoId(id)} />
      {videoId && <VideoBackground videoId={videoId} />}
      <PlayerControls videoId={videoId} />
    </div>
  );
}

export default App;

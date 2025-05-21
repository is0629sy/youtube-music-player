// src/components/SearchBar.tsx
import { useState } from 'react';
import { fetchVideoId } from '../api/youtube';

type SearchBarProps = {
  onSearch: (videoId: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const videoId = await fetchVideoId(query);
    setLoading(false);

    if (videoId) {
      onSearch(videoId);
    } else {
      alert('動画が見つかりませんでした。');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '1rem 0' }}>
      <input
        type="text"
        placeholder="曲名を入力..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button type="submit" style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
        {loading ? '検索中...' : '検索'}
      </button>
    </form>
  );
};

export default SearchBar;

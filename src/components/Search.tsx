import { useState } from 'react';
import { fetchVideoSuggestions } from '../api/youtube';
import SearchResults from './SearchResults';

type Props = {
  onVideoSelect: (videoId: string) => void;
};

const Search = ({ onVideoSelect }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const videos = await fetchVideoSuggestions(query);
    setResults(videos);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ margin: '1rem 0' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="曲名またはアーティスト名を入力..."
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button type="submit" style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          {loading ? '検索中...' : '検索'}
        </button>
      </form>
      <SearchResults results={results} onSelect={onVideoSelect} />
    </div>
  );
};

export default Search;

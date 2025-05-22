type Props = {
    results: { id: string; title: string }[];
    onSelect: (videoId: string) => void;
  };
  
  const SearchResults = ({ results, onSelect }: Props) => (
    <ul style={{ padding: 0 }}>
      {results.map((video) => (
        <li key={video.id} style={{ margin: '0.5rem 0' }}>
          <button
            onClick={() => onSelect(video.id)}
            style={{
              background: 'none',
              border: '1px solid #fff',
              color: 'white',
              padding: '0.5rem',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            🎵 {video.title}
          </button>
        </li>
      ))}
    </ul>
  );
  
  export default SearchResults;
  
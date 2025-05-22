export const fetchVideoSuggestions = async (query: string): Promise<{ id: string; title: string }[]> => {
    const apiKey = 'AIzaSyAcix-hnNaQZF12aA086ZkazmYE1ct316M';
    const encodedQuery = encodeURIComponent(`${query} music`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${encodedQuery}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
    }));
  };
  
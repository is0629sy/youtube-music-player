// src/api/youtube.ts
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * YouTubeで検索し、最初の動画のIDを取得する
 */
export const fetchVideoId = async (query: string): Promise<string | null> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 1,
        videoCategoryId: 10, // 音楽カテゴリ
      },
    });

    const item = response.data.items[0];
    return item?.id?.videoId ?? null;
  } catch (error) {
    console.error('YouTube API エラー:', error);
    return null;
  }
};

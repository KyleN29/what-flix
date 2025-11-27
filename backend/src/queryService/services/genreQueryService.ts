import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export interface Genre {
  id: number;
  name: string;
}

interface Cache {
  timestamp: number;
  genres: Genre[];
}

class GenreQueryService {
  baseURL = 'https://api.themoviedb.org/3';
  apiKey = process.env.TMDB_API_KEY;

  axiosInstance = axios.create({
    baseURL: this.baseURL,
    params: {
      api_key: this.apiKey
    }
  });
  // Timeout for when cache is expired and should no longer be used
  CACHE_TIMEOUT = 1000 * 60 * 10; // 10 minutes

  genreCache: Cache = {
    timestamp: 0,
    genres: []
  };
  async getGenres(): Promise<Genre[]> {
    const now = Date.now();

    // Serve from cache if fresh
    if (now - this.genreCache.timestamp < this.CACHE_TIMEOUT) {
      return this.genreCache.genres;
    }

    const response = await this.axiosInstance.get('/genre/movie/list');

    const genres = response.data.genres;

    // Update cache
    this.genreCache.timestamp = now;
    this.genreCache.genres = genres;

    return genres;
  }
}
const genreQueryService = new GenreQueryService();
export default genreQueryService;

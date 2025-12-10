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
  // TMDB API configuration
  baseURL = 'https://api.themoviedb.org/3';
  apiKey = process.env.TMDB_API_KEY;

  axiosInstance = axios.create({
    baseURL: this.baseURL,
    params: { api_key: this.apiKey }
  });

  // Cache timeout duration
  CACHE_TIMEOUT = 1000 * 60 * 10;

  // Cached genre response
  genreCache: Cache = {
    timestamp: 0,
    genres: []
  };

  // Fetch available genres with caching
  async getGenres(): Promise<Genre[]> {
    const now = Date.now();

    // Serve from cache if fresh
    const fresh = now - this.genreCache.timestamp < this.CACHE_TIMEOUT;
    if (fresh) return this.genreCache.genres;

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

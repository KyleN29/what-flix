import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Trailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface TrailerResponse {
  id: number;
  results: Trailer[];
}
interface Cache {
    timestamp: number;
    movies: Movie[];
}

class MovieService {
  static baseURL = 'https://api.themoviedb.org/3';
  static apiKey = process.env.TMDB_API_KEY;

  static axiosInstance = axios.create({
    baseURL: MovieService.baseURL,
    params: {
      api_key: MovieService.apiKey
    }
  }); 

  /* Cache popular movies so it doesn't get called by every user
  loading the main page */
  static popularMovieCache: Cache = {
    timestamp: 0,
    movies: [],
  }
  // Timeout for when cache is expired and should no longer be used
  static CACHE_TIMEOUT = 1000 * 60 * 10 // 10 minutes

  // Return list of popular movies from TMDB API
  static async getPopularMovies(page = 1): Promise<Movie[]> {
    if (Date.now() - this.popularMovieCache.timestamp < this.CACHE_TIMEOUT) {
      return this.popularMovieCache.movies;
    }

    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });

    // Update cache
    this.popularMovieCache.timestamp = Date.now()
    this.popularMovieCache.movies = response.data.results;

    return response.data.results;
  }

  static async getMovieDetail(movieId: string): Promise<Movie> {
    const response = await this.axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  }

  static async getMovieTrailers(movieId: string): Promise<Trailer[]> {
    const response = await this.axiosInstance.get(`/movie/${movieId}/videos`);
    return response.data.results;
  }
}

export default MovieService
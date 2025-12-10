import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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

export interface genre {
  id: number;
  name: string;
}

export interface production_company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface production_country {
  iso_3166_1: string;
  name: string;
}

export interface spoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poser_path: string; // possible bug? spelling matches original
  production_companies: production_company[];
  production_countries: production_country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: spoken_language[];
  status: string;
  tagline: string;
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

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface Cache {
  timestamp: number;
  movies: Movie[];
}

class MovieQueryService {
  // TMDB API configuration
  baseURL = 'https://api.themoviedb.org/3';
  apiKey = process.env.TMDB_API_KEY;

  axiosInstance = axios.create({
    baseURL: this.baseURL,
    params: { api_key: this.apiKey }
  });

  // Cache for popular movies keyed by page
  popularMovieCache: Record<number, Cache> = {};
  CACHE_TIMEOUT = 1000 * 60 * 10;

  // Fetch popular movies with caching
  async getPopularMovies(page = 1): Promise<Movie[]> {
    const cacheEntry = this.popularMovieCache[page];
    const valid =
      cacheEntry && Date.now() - cacheEntry.timestamp < this.CACHE_TIMEOUT;

    if (valid) return cacheEntry.movies;

    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });

    this.popularMovieCache[page] = {
      timestamp: Date.now(),
      movies: response.data.results
    };

    return response.data.results;
  }

  // Fetch detailed movie information
  async getMovieDetail(movieId: string): Promise<MovieDetail> {
    const response = await this.axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  }

  // Fetch trailer list
  async getMovieTrailers(movieId: string): Promise<Trailer[]> {
    const response = await this.axiosInstance.get(`/movie/${movieId}/videos`);
    return response.data.results;
  }

  // Search movies across multiple pages
  async searchMovies(query: string, pagesToFetch = 3): Promise<Movie[]> {
    let allResults: Movie[] = [];

    for (let page = 1; page <= pagesToFetch; page++) {
      const response = await this.axiosInstance.get<MovieResponse>(
        '/search/movie',
        { params: { query, page } }
      );

      allResults.push(...response.data.results);

      if (page >= response.data.total_pages) break;
    }

    return allResults.sort((a, b) => b.popularity - a.popularity);
  }

  // Cache for movie credits
  creditCache: Record<number, any> = {};
  CREDIT_CACHE_TIMEOUT = 1000 * 60 * 60 * 24;

  async getMovieCredits(movieId: number): Promise<MovieCredits> {
    const cached = this.creditCache[movieId];
    const valid =
      cached && Date.now() - cached.timestamp < this.CREDIT_CACHE_TIMEOUT;

    if (valid) return cached.data;

    const response = await this.axiosInstance.get(`/movie/${movieId}/credits`);
    const data = response.data;

    this.creditCache[movieId] = {
      timestamp: Date.now(),
      data
    };

    return data;
  }

  // Cache for discover queries, keyed by param JSON
  discoverCache: Record<string, any> = {};
  DISCOVER_CACHE_TIMEOUT = 1000 * 60 * 60 * 24;

  async discoverMovies(params: Record<string, any>): Promise<Movie[]> {
    const cacheKey = JSON.stringify(params);
    const cached = this.discoverCache[cacheKey];

    const valid =
      cached && Date.now() - cached.timestamp < this.DISCOVER_CACHE_TIMEOUT;

    if (valid) return cached.movies;

    const response = await this.axiosInstance.get('/discover/movie', {
      params
    });

    const movies: Movie[] = response.data.results;

    this.discoverCache[cacheKey] = {
      timestamp: Date.now(),
      movies
    };

    return movies;
  }
}

const movieQueryService = new MovieQueryService();
export default movieQueryService;

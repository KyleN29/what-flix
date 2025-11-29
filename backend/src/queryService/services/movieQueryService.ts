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
  poser_path: string;
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
interface Cache {
  timestamp: number;
  movies: Movie[];
}

class MovieQueryService {
  baseURL = 'https://api.themoviedb.org/3';
  apiKey = process.env.TMDB_API_KEY;

  axiosInstance = axios.create({
    baseURL: this.baseURL,
    params: {
      api_key: this.apiKey
    }
  });

  // Cache for popular movies keyed by page number
  popularMovieCache: Record<number, Cache> = {};

  // Timeout for when cache expires
  CACHE_TIMEOUT = 1000 * 60 * 10; // 10 minutes

  // Return list of popular movies from TMDB API
  async getPopularMovies(page = 1): Promise<Movie[]> {
    const cacheEntry = this.popularMovieCache[page];

    // Check cache validity
    const hasValidCache =
      cacheEntry && Date.now() - cacheEntry.timestamp < this.CACHE_TIMEOUT;

    if (hasValidCache) {
      return cacheEntry.movies;
    }

    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });

    // Update cache
    this.popularMovieCache[page] = {
      timestamp: Date.now(),
      movies: response.data.results
    };

    return response.data.results;
  }

  async getMovieDetail(movieId: string): Promise<MovieDetail> {
    const response = await this.axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  }

  async getMovieTrailers(movieId: string): Promise<Trailer[]> {
    const response = await this.axiosInstance.get(`/movie/${movieId}/videos`);
    return response.data.results;
  }

  async searchMovies(query: string, pagesToFetch = 3): Promise<Movie[]> {
    let allResults: Movie[] = [];
    console.log(pagesToFetch)
    for (let page = 1; page <= pagesToFetch; page++) {
      const response = await this.axiosInstance.get<MovieResponse>(
        '/search/movie',
        { params: { query, page } }
      );

      allResults.push(...response.data.results);
      console.log("iteration")
      if (page >= response.data.total_pages) break; // TMDB has fewer pages than requested
    }
    
    return allResults.sort((a, b) => b.popularity - a.popularity);
  }
}

const movieQueryService = new MovieQueryService();
export default movieQueryService;

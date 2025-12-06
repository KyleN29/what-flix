import axios from 'axios';

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
  poster_path: string;
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
class MovieService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  static async getPopularMovies(page = 1): Promise<Movie[]> {
    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  }

  static async getMovieDetail(movieId: string): Promise<MovieDetail> {
    const response = await this.axiosInstance.get(`/movie/detail`, {
      params: { movieId }
    });
    return response.data;
  }

  static async getMovieTrailer(movieId: string): Promise<Trailer> {
    const response = await this.axiosInstance.get('/movie/trailer', {
      params: { movieId }
    });
    return response.data;
  }

  static async searchMovies(query: string, numPages = 1): Promise<Movie[]> {
    const response = await this.axiosInstance.get('/movie/search', {
      params: { query, numPages }
    });
    return response.data;
  }
}

export default MovieService;

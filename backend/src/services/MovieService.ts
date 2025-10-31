import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

interface Movie {
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

class MovieService {
  static baseURL = 'https://api.themoviedb.org/3';
  static apiKey = process.env.TMDB_API_KEY;

  static axiosInstance = axios.create({
    baseURL: MovieService.baseURL,
    params: {
      api_key: MovieService.apiKey
    }
  }); 
  
  static async getPopularMovies(page = 1): Promise<MovieResponse> {
    console.log(MovieService.apiKey)
    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });

    return response.data;
  }
}

export default MovieService
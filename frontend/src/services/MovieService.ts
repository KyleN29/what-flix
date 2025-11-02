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

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
class MovieService {

  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  }); 
  
  static async getPopularMovies(page = 1): Promise<Movie[]> {
    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });
    console.log(response.data)
    return response.data;
  }
}

export default MovieService
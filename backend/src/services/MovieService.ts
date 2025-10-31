import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

class MovieService {
  static baseURL = 'https://api.themoviedb.org/3';
  static apiKey = process.env.TMDB_API_KEY;

  static axiosInstance = axios.create({
    baseURL: MovieService.baseURL,
    params: {
      api_key: MovieService.apiKey
    }
  }); 
  
  static async getPopularMovies(page = 1) {
    console.log(MovieService.apiKey)
    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });
    console.log(response.status);

    return response.data;
  }
}

export default MovieService
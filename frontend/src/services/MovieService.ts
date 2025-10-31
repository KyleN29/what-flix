import axios from 'axios';


class MovieService {

  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  }); 
  
  static async getPopularMovies(page = 1): Promise<{ results: any }> {
    const response = await this.axiosInstance.get('/movie/popular', {
      params: { page }
    });

    return response.data;
  }
}

export default MovieService
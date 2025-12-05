import axios from 'axios';
import AuthService from './AuthService';

export interface GenreRank {
  rank: Number;
  name: string;
}

class GenreService {
  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  }); 
  


  static async getUserGenreList(): Promise<GenreRank[]> {
    const response = await this.axiosInstance.get('/user/gerne_ranking');
    return response.data
  }

  static async updateGenres(genres: GenreRank[]) {
    return this.axiosInstance.put("/user/genre_ranking", genres, AuthService.getAuthConfig());
  }
}

export default GenreService
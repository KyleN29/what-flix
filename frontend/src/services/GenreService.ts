import axios from 'axios';
import AuthService from './AuthService';
export interface Genre {
  id: number;
  name: string;
}

class GenreService {
  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  }); 
  
  static async getGenreList(): Promise<Genre[]> {
    const response = await this.axiosInstance.get('/genre/list');
    console.log(response.data[0])

    return response.data;
  }

  static async updateGenres(genres: { rank: number; name: string }[]) {
    return this.axiosInstance.put("/user/genre_ranking", genres, AuthService.getAuthConfig());
  }
}

export default GenreService
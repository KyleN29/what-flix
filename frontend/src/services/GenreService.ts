import axios from 'axios';

export interface Genre {
  id: number;
  name: string;
}

class GenreService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  // Fetch full list of genres
  static async getGenreList(): Promise<Genre[]> {
    const response = await this.axiosInstance.get('/genre/list');
    return response.data;
  }
}

export default GenreService;

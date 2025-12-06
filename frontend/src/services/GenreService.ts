import axios from 'axios';
export interface Genre {
  id: number;
  name: string;
}

class GenreService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  }); 
  
  static async getGenreList(): Promise<Genre[]> {
    console.log(import.meta.env.VITE_API_URL)
    const response = await this.axiosInstance.get('/genre/list');
    console.log(response.data[0])

    return response.data;
  }
}

export default GenreService
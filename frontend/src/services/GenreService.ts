import axios from 'axios';
export interface Genre {
  id: number;
  name: string;
}

export interface GenreRank {
  rank: Number;
  name: string;
}

class GenreService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.API_URL,
  }); 
  
  static async getGenreList(): Promise<Genre[]> {
    const response = await this.axiosInstance.get('/genre/list');
    console.log(response.data[0])

    return response.data;
  }
}

export default GenreService
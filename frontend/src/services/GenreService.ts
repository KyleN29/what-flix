import axios from 'axios';

export interface Genre {
  id: number;
  name: string;
}

class GenreService {
  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  }); 
  
  static async getGenreList(): Promise<Genre[]> {
    console.log("HELLO!")
    const response = await this.axiosInstance.get('/genre/list');
    console.log(response.data[0])

    return response.data;
  }
}

export default GenreService
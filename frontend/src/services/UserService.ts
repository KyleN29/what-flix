import axios from 'axios';
import AuthService from './AuthService';

export interface Person {
    person_id: Number;
    name: string;
}
export interface GenreRank {
  rank: Number;
  id: Number;
  name: string;
}

class UserService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  }); 
  


  static async getUserGenreList(): Promise<GenreRank[]> {
    const response = await this.axiosInstance.get('/user/genre_ranking', AuthService.getAuthConfig());
    return response.data
  }

  static async getLikedPeople(): Promise<Person[]> {
    const response = await this.axiosInstance.get('/user/liked_people', AuthService.getAuthConfig());
    return response.data
  }


  static async updateGenres(genres: GenreRank[]) {
    return this.axiosInstance.put("/user/genre_ranking", genres, AuthService.getAuthConfig());
  }

  static async updateLikedPeople(people: Person[]) {
    return this.axiosInstance.put("/user/liked_people", people, AuthService.getAuthConfig());
  }
}

export default UserService
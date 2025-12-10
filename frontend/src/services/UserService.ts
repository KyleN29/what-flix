import axios from 'axios';
import AuthService from './AuthService';

export interface Person {
  person_id: number;
  name: string;
}

export interface GenreRank {
  rank: number;
  id: number;
  name: string;
}

class UserService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // Fetch ranked genres for the user
  static async getUserGenreList(): Promise<GenreRank[]> {
    const response = await this.axiosInstance.get(
      '/user/genre_ranking',
      AuthService.getAuthConfig()
    );
    return response.data;
  }

  // Fetch liked people for the user
  static async getLikedPeople(): Promise<Person[]> {
    const response = await this.axiosInstance.get(
      '/user/liked_people',
      AuthService.getAuthConfig()
    );
    return response.data;
  }

  // Update genre rankings
  static async updateGenres(genres: GenreRank[]) {
    return this.axiosInstance.put(
      '/user/genre_ranking',
      genres,
      AuthService.getAuthConfig()
    );
  }

  // Update liked people
  static async updateLikedPeople(people: Person[]) {
    return this.axiosInstance.put(
      '/user/liked_people',
      people,
      AuthService.getAuthConfig()
    );
  }
}

export default UserService;

import axios from 'axios';
import AuthService from './AuthService';

export interface Person {
    person_id: Number;
    name: string;
}

export interface UserData {
  user_id: string;
  email: string;
  username: string;
  created_at: Date;
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

  static async getUserData(): Promise<UserData> {
    const response = await this.axiosInstance.get('/user/', AuthService.getAuthConfig());
    return response.data;
  }

  static async getUserGenreBlacklist(): Promise<GenreRank[]> {
    const response = await this.axiosInstance.get('/user/genre_blacklist', AuthService.getAuthConfig());
    return response.data
  }

  static async updateGenreBlacklist(genres: GenreRank[]) {
    return this.axiosInstance.put("/user/genre_blacklist", genres, AuthService.getAuthConfig());
  }

  static async updateProfilePicture(profile_pic_url: string) {
    return this.axiosInstance.put("/user/profile_picture", { profile_pic_url }, AuthService.getAuthConfig());
  }

  static async getProfilePicture(): Promise<string | null> {
    const response = await this.axiosInstance.get('/user/profile_picture', AuthService.getAuthConfig());
    return response.data;
  }

  static async updateEmail(newEmail: string) {
    return this.axiosInstance.put("/user/update_email", { newEmail }, AuthService.getAuthConfig());
  } 

  static async updatePassword(currentPassword: string, newPassword: string) {
    return this.axiosInstance.put("/user/update_password", { currentPassword, newPassword }, AuthService.getAuthConfig());
  }
}

export default UserService;

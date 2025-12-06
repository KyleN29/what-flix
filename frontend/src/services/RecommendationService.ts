import axios from 'axios';
// import UserService, {type GenreRank, type Person} from './UserService'
// import { type Movie } from './MovieService';

class RecommendationService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  }); 

//   static async getGeneralRecommendations() {
//     const userGenreList: GenreRank[] = await UserService.getUserGenreList();
//     const userPeopleList: Person[] = await UserService.getLikedPeople();

//     const numPages = 10;
//     // Get popular movies from numPages and rank them by score
//   }

//   static async scoreMovie(movie: Movie, userGenreList: GenreRank[], userPeopleList: Person[]) {

//   }
  

}

export default RecommendationService
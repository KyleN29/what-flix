import UserRead from "../models/UserRead.js"
import PreferencesRead from "../models/GenrePreferencesRead.js";
import WatchListRead from "../models/WatchListRead.js";
import AccessibilityRead from "../models/UserAccessibilityRead.js";
import MoviesSeenRead from "../models/UserMoviesSeenRead.js";
import MovieRatingRead from "../models/MovieRatingRead.js";

class AccountQueryService {
  async getUser(userId: string) {
    return UserRead.findOne({ user_id: userId });
  }

  async getPreferences(userId: string) {
    return PreferencesRead.findOne({ userId });
  }

  async getWatchList(userId: string) {
    return WatchListRead.find({ userId });
  }

  async getAccessibility(userId: string) {
    return AccessibilityRead.findOne({ userId });
  }

  async getMoviesSeen(userId: string) {
    return MoviesSeenRead.find({ userId });
  }

  async getMovieRanking(userId: string, movieId: number){
    return MovieRatingRead.findOne({ userId, movieId });
  }

}

const accountQueryService = new AccountQueryService();
export default accountQueryService;

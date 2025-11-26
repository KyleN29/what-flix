import UserRead from "../models/UserRead.js"
import PreferencesRead from "../models/PreferencesRead.js";
import WatchListRead from "../models/WatchListRead.js";
import AccessibilityRead from "../models/UserAccessibilityRead.js";
import MoviesSeenRead from "../models/UserMoviesSeenRead.js";

class AccountQueryService {
  async getUser(id: string) {
    return UserRead.findById(id);
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

  }

}

const accountQueryService = new AccountQueryService();
export default accountQueryService;

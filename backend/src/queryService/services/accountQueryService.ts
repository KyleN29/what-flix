import UserRead from "../models/UserRead.js";
import PreferencesRead from "../models/GenrePreferencesRead.js";
import WatchListRead from "../models/WatchListRead.js";
import AccessibilityRead from "../models/UserAccessibilityRead.js";
import MoviesSeenRead from "../models/UserMoviesSeenRead.js";
import MovieRatingRead from "../models/MovieRatingRead.js";

class AccountQueryService {
  // Fetch user profile document
  async getUser(id: string) {
    return UserRead.findById(id);
  }

  // Fetch user genre preferences
  async getPreferences(userId: string) {
    return PreferencesRead.findOne({ userId });
  }

  // Fetch user's watch list entries
  async getWatchList(userId: string) {
    return WatchListRead.find({ userId });
  }

  // Fetch user accessibility settings
  async getAccessibility(userId: string) {
    return AccessibilityRead.findOne({ userId });
  }

  // Fetch movies the user has marked as seen
  async getMoviesSeen(userId: string) {
    return MoviesSeenRead.find({ userId });
  }

  // Fetch user's rating for a specific movie
  async getMovieRanking(userId: string, movieId: number) {
    return MovieRatingRead.findOne({ userId, movieId });
  }
}

const accountQueryService = new AccountQueryService();
export default accountQueryService;

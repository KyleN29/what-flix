import UserRead from "../models/UserRead.js";
import PreferencesRead from "../models/GenrePreferencesRead.js";
import WatchListRead from "../models/WatchListRead.js";
import AccessibilityRead from "../models/UserAccessibilityRead.js";
import MoviesSeenRead from "../models/UserMoviesSeenRead.js";
import MovieRatingRead from "../models/MovieRatingRead.js";
import GenreBlacklistRead from "../models/GenreBlacklistRead.js";
import ProfilePictureRead from "../models/ProfilePictureRead.js";

class AccountQueryService {
  async getUser(userId: string) {
    return UserRead.findOne({ user_id: userId });
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

  async getGenreBlacklist(userId: string) {
    return GenreBlacklistRead.findOne({ user_id: userId });
  }

  async getProfilePicture(userId: string) {
    return ProfilePictureRead.findOne({ user_id: userId });
  }

}

const accountQueryService = new AccountQueryService();
export default accountQueryService;

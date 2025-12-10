import UserWrite from '../models/UserWrite.js';
import UserRead from '../../queryService/models/UserRead.js';
import UserAuthRead from '../../queryService/models/UserAuthRead.js';
import UserMovieRankingWrite from '../models/UserMovieRankingWrite.js';
import WatchLaterWrite from '../models/WatchLaterWrite.js';
import eventBus from '../eventBus/EventBus.js';
import { hashPassword, comparePassword } from '../../password-utils.js';
import jwt from 'jsonwebtoken';
import UserAuthWrite from '../models/UserAuthWrite.js';
import { v4 as uuidv4 } from 'uuid';
import GenrePreferencesWrite from '../models/GenrePreferencesWrite.js';
import PeoplePreferencesWrite from '../models/PeoplePreferencesWrite.js';
import GenreBlacklistWrite from '../models/GenreBlacklistWrite.js';
import ProfilePictureWrite from '../models/ProfilePictureWrite.js';

class AccountCommandService {
  // Creates the user document and publishes the event
  async createUser(dto: any) {
    const user = new UserWrite(dto);
    await user.save();

    await eventBus.publish('UserCreated', {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      created_at: user.created_at
    });

    return user;
  }

  // Creates the auth document and publishes the event
  async createUserAuth(dto: any) {
    const userAuth = new UserAuthWrite(dto);
    await userAuth.save();

    await eventBus.publish('UserAuthCreated', {
      user_id: userAuth.user_id,
      password_hash: userAuth.password_hash
    });

    return userAuth;
  }

  // Updates the user's genre preferences and publishes the event
  async updateGenrePreferences(userId: string, genres: any) {
    const dto = {
      user_id: userId,
      genre_rankings: genres
    };

    const prefs = await GenrePreferencesWrite.findOneAndUpdate(
      { user_id: userId },
      dto,
      { new: true, upsert: true }
    );

    await eventBus.publish('GenrePreferencesUpdated', {
      user_id: userId,
      preferences: prefs
    });

    return prefs;
  }

  // Updates the user's liked people and publishes the event
  async updatePeoplePreferences(userId: string, people: any) {
    const dto = {
      user_id: userId,
      liked_people: people
    };

    const prefs = await PeoplePreferencesWrite.findOneAndUpdate(
      { user_id: userId },
      dto,
      { new: true, upsert: true }
    );

    await eventBus.publish('PeoplePreferencesUpdated', {
      user_id: userId,
      preferences: prefs
    });

    return prefs;
  }

  async updateGenreBlacklist(userId: string, genres: any) {
    const dto = {
      user_id: userId,
      blacklisted_genres: genres,
    }
    const blacklist = await GenreBlacklistWrite.findOneAndUpdate({ user_id: userId }, dto, {
      new: true,
      upsert: true
    });

    await eventBus.publish('GenreBlacklistUpdated', {
      user_id: userId,
      blacklist: blacklist
    });

    return blacklist;
  }

  // Authenticates the user and returns a JWT access token
  async login(email: string, password: string) {
    const user = await UserRead.findOne({ email });
    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const userAuth = await UserAuthRead.findOne({ user_id: user.user_id });
    if (!userAuth) {
      throw { status: 401, message: 'Failed to authenticate' };
    }

    const isValidPassword = await comparePassword(
      password,
      userAuth.password_hash
    );

    if (!isValidPassword) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const accessToken = jwt.sign(
      { user_id: user.user_id, email: email },
      'jwt-secret',
      { expiresIn: '3d' }
    );

    return { accessToken };
  }

  // Registers a new user, creates auth info, and returns an access token
  async register(email: string, username: string, password: string) {
    const user = await this.createUser({
      user_id: uuidv4(),
      email,
      username,
      created_at: Date.now()
    });

    const hashedPassword = await hashPassword(password);
    const userAuth = await this.createUserAuth({
      user_id: user.user_id,
      password_hash: hashedPassword
    });

    console.log(userAuth);

    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      'jwt-secret',
      { expiresIn: '3d' }
    );

    return { accessToken };
  }

  // Placeholder for updating account info
  async updateAccountInfo(token: string, userId: string, dto: any) {}

  // Placeholder for deleting account
  async deleteAccount(email: string, password: string) {}

  // Updates the user’s movie ranking
  async updateMovieRanking(userId: string, dto: any) {
    const ranking = await UserMovieRankingWrite.findOneAndUpdate(
      { user_id: userId, movie_id: dto.movie_id },
      { $set: { rating: dto.rating } },
      { new: true, upsert: true }
    );

    return ranking;
  }

  // Deletes the user's movie ranking
  async deleteMovieRanking(userId: string, movieId: number) {
    const result = await UserMovieRankingWrite.deleteOne({
      user_id: userId,
      movie_id: movieId
    });

    if (result.deletedCount === 0) {
      throw new Error('Movie ranking not found');
    }

    return { message: 'Movie ranking deleted successfully' };
  }

  // Adds a movie to the user's watch-later list
  async addWatchLater(userId: string, movieId: number) {
    const watchLater = await WatchLaterWrite.create({
      user_id: userId,
      movie_id: movieId
    });

    return watchLater;
  }

  // Removes a movie from the user's watch-later list
  async removeWatchLater(userId: string, movieId: number) {
    const result = await WatchLaterWrite.deleteOne({
      user_id: userId,
      movie_id: movieId
    });

    if (result.deletedCount === 0) {
      throw new Error('Movie not found in watch later list');
    }

    return { message: 'Movie removed from watch later list' };
  }

  async updateProfilePicture(userId: string, pictureData: any) {
    const result = await ProfilePictureWrite.findOneAndUpdate(
      { user_id: userId },
      { user_id: userId, profile_pic_url: pictureData, uploaded_at: Date.now() },
      { new: true, upsert: true }
    );

    await eventBus.publish('ProfilePictureUpdated', {
      user_id: userId,
      pictureData: result.profile_pic_url
    });

    return result;
  }

  async updateEmail(userId: string, newEmail: string) {
    const user = await UserWrite.findOneAndUpdate(
      { user_id: userId },
      { email: newEmail },
    );

    if (!user) {
      throw new Error('User not found');
    }
    
    await eventBus.publish('UserEmailUpdated', {
      user_id: userId,
      email: newEmail
    });
    return user;
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const userAuth = await UserAuthRead.findOne({ user_id: userId });
    
    if (!userAuth) {
      throw new Error('User authentication record not found');
    }

    const isValidPassword = await comparePassword(currentPassword, userAuth.password_hash);
    
    if (!isValidPassword) {
      throw { status: 401, message: 'Current password is incorrect' };
    }

    const hashedNewPassword = await hashPassword(newPassword);
    
    const result = await UserAuthWrite.findOneAndUpdate(
      { user_id: userId },
      { password_hash: hashedNewPassword },
      { new: true }
    );

    await eventBus.publish('UserPasswordUpdated', {
      user_id: userId,
      password_hash: result.password_hash,
      updated_at: Date.now()
    });

    return result;
  }
}

const accountCommandService = new AccountCommandService();
export default accountCommandService;

import UserWrite from '../models/UserWrite.js';
import UserRead from '../../queryService/models/UserRead.js';
import UserAuthRead from '../../queryService/models/UserAuthRead.js';
import PreferencesWrite from '../models/GenrePreferencesWrite.js';
import UserMovieRankingWrite from '../models/UserMovieRankingWrite.js';
import WatchLaterWrite from '../models/WatchLaterWrite.js';
import eventBus from '../eventBus/EventBus.js';
import { hashPassword, comparePassword } from '../../password-utils.js';
import jwt from 'jsonwebtoken';
import UserAuthWrite from '../models/UserAuthWrite.js';
import { v4 as uuidv4 } from 'uuid'
import GenrePreferencesWrite from '../models/GenrePreferencesWrite.js';


class AccountCommandService {
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

  async createUserAuth(dto: any) {
    const userAuth = new UserAuthWrite(dto);
    await userAuth.save();

    await eventBus.publish('UserAuthCreated', {
      user_id: userAuth.user_id,
      password_hash: userAuth.password_hash 
    });

    return userAuth;
  }

  async updateGenrePreferences(userId: string, genres: any) {
    const dto = {
      user_id: userId,
      genre_rankings: genres,
    }
    const prefs = await GenrePreferencesWrite.findOneAndUpdate({ user_id: userId }, dto, {
      new: true,
      upsert: true
    });

    await eventBus.publish('GenrePreferencesUpdated', {
      user_id: userId,
      preferences: prefs
    });

    return prefs;
  }

  async login(email: string, password: string) {
    const user = await UserRead.findOne({ email });
    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const userAuth = await UserAuthRead.findOne({ user_id: user.user_id });
    if (!userAuth) {
      throw { status: 401, message: 'Failed to authenticate' };
    }
    const isValidPassword = await comparePassword(password, userAuth.password_hash);

    if (!isValidPassword) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const accessToken = jwt.sign(
      { user_id: user.user_id, email: email },
      'jwt-secret',
      {
        expiresIn: '3d'
      }
    );

    return { accessToken };
  }

  async register(email: string, username: string, password: string) {
    
    const user = await this.createUser({
      user_id: uuidv4(),
      email,
      username,
      created_at: Date.now()
    });
    const hashedPassword = await hashPassword(password);
    const userAuth = await this.createUserAuth({user_id: user.user_id, password_hash: hashedPassword})
    console.log(userAuth)
    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      'jwt-secret',
      {
        expiresIn: '3d'
      }
    );

    return { accessToken };
  }

  async updateAccountInfo(token: string, userId: string, dto: any) {}

  async deleteAccount(email: string, password: string) {}

  async updateMovieRanking(userId: string, dto: any) {
    const ranking = await UserMovieRankingWrite.findOneAndUpdate(
      { user_id: userId, movie_id: dto.movie_id },
      { $set: { rating: dto.rating } },
      { new: true, upsert: true }
    );

    return ranking;
  }

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

  async addWatchLater(userId: string, movieId: number) {
    const watchLater = await WatchLaterWrite.create({
      user_id: userId,
      movie_id: movieId
    });

    return watchLater;
  }

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
}

const accountCommandService = new AccountCommandService();
export default accountCommandService;

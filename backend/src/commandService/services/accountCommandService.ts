import UserWrite from '../models/UserWrite.js'
import UserRead from '../../queryService/models/UserRead.js';
import UserAuthRead from '../../queryService/models/UserAuthRead.js';
import PreferencesWrite from '../models/PreferencesWrite.js'
import UserMovieRankingWrite from '../models/UserMovieRankingWrite.js';
import WatchLaterWrite from '../models/WatchLaterWrite.js';
import eventBus from '../eventBus/EventBus.js';
import { comparePassword } from '../../password-utils.js';
import jwt from 'jsonwebtoken'

class AccountCommandService {
  async createUser(dto: any) {
    const user = new UserWrite(dto);
    await user.save();

    await eventBus.publish("UserCreated", {
      userId: user.id,
      email: user.email,
      username: user.username,
      created_at: user.created_at
    });

    return user;
  }

  async updatePreferences(userId: string, dto: any) {
    const prefs = await PreferencesWrite.findOneAndUpdate({ userId }, dto, {
      new: true,
      upsert: true
    });

    await eventBus.publish("PreferencesUpdated", {
      userId,
      preferences: prefs
    });

    return prefs;
  }

  async login(email: string, password: string) {
    const user = await UserRead.findOne({email});
    if (!user) {
      throw { status: 401, message: 'Invalid credentials'}
    }

    const userAuth = await UserAuthRead.findOne({_id: user._id});

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw {status: 401, message: 'Invalid credentials'}
    }

    const accessToken = jwt.sign({id: user._id, email: email}, 'access-secret', {
      expiresIn: '3d'
    })

    return { accessToken }
  }

  async updateAccountInfo(token: string, userId: string, dto: any) {

  }

  async deleteAccount(email: string, password: string) {

  }

  async updateMovieRanking(userId: string, dto: any){

    const ranking = await UserMovieRankingWrite.findOneAndUpdate(
      { user_id: userId, movie_id: dto.movie_id },
      { $set: { rating: dto.rating } },
      { new: true, upsert: true }
    );

    return ranking;
  }

  async deleteMovieRanking(userId: string, movieId: number){

    const result = await UserMovieRankingWrite.deleteOne({ 
      user_id: userId, 
      movie_id: movieId 
    });
    
    if (result.deletedCount === 0) {
      throw new Error("Movie ranking not found");
    }
    
    return { message: "Movie ranking deleted successfully" };
  }

  async addWatchLater(userId: string, movieId: number){
    const watchLater = await WatchLaterWrite.create({ 
      user_id: userId, 
      movie_id: movieId 
    });
    
    return watchLater;
  }

  async removeWatchLater(userId: string, movieId: number){
    const result = await WatchLaterWrite.deleteOne({ 
      user_id: userId, 
      movie_id: movieId 
    });
      
    if (result.deletedCount === 0) {
      throw new Error("Movie not found in watch later list");
    }
      
    return { message: "Movie removed from watch later list" };
  }
}

const accountCommandService = new AccountCommandService();
export default accountCommandService
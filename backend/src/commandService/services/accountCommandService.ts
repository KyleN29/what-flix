import UserWrite from '../models/UserWrite.js'
import UserRead from '../../queryService/models/UserRead.js';
import UserAuthRead from '../../queryService/models/UserAuthRead.js';
import PreferencesWrite from '../models/PreferencesWrite.js'
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

  async verifyToken(token: string, userId: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(token, 'access-secret') as { id: string, email: string };
      return decoded.id === userId;
    } catch (error) {
      return false;
    }
  }

  async updateAccountInfo(email: string, password: string, dto: any) {

  }

  async deleteAccount(email: string, password: string) {

  }
}

const accountCommandService = new AccountCommandService();
export default accountCommandService
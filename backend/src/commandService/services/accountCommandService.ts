import UserWrite from '../models/UserWrite.js'
import PreferencesWrite from '../models/PreferencesWrite.js'
import eventBus from '../eventBus/EventBus.js';

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
}

const accountCommandService = new AccountCommandService();
export default accountCommandService
import User from '../../models/User.js'
import Preferences from '../../models/Preferences.js';

class AccountCommandService {
  async createUser(dto: any) {
    const user = new User(dto);
    await user.save();
    return user;
  }

  async updatePreferences(userId: string, dto: any) {
    const prefs = await Preferences.findOneAndUpdate({ userId }, dto, {
      new: true,
      upsert: true
    });
    return prefs;
  }
}

const accountCommandService = new AccountCommandService();
export default accountCommandService;

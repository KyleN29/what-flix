import User from "../../models/User.js";
import Preferences from "../../models/Preferences.js";

class AccountQueryService {
  async getUser(id: string) {
    return User.findById(id);
  }

  async getPreferences(userId: string) {
    return Preferences.findOne({ userId });
  }
}

const accountQueryService = new AccountQueryService();
export default accountQueryService;

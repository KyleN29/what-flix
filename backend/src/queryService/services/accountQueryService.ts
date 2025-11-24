import UserRead from "../models/UserRead.js"
import PreferencesRead from "../models/PreferencesRead.js";

class AccountQueryService {
  async getUser(id: string) {
    return UserRead.findById(id);
  }

  async getPreferences(userId: string) {
    return PreferencesRead.findOne({ userId });
  }
}

const accountQueryService = new AccountQueryService();
export default accountQueryService;

import axios from 'axios';

export interface user {
    email: string,
    username: string,
    created_at: Date
};

class AccountService {
  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  }); 

  static async getUserData(id: string): Promise<user> {
    const response = await this.axiosInstance.get(`/user/${id}`);
    return response.data;
  }

}

export default AccountService;
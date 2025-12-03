import axios from 'axios';

class AccountService {
    static axiosInstance = axios.create({
        baseURL: 'http://localhost:3000'
    });

    static async getUsername(userId: string) {
        
    }


}

export default AccountService
import axios from 'axios';

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

class AuthService {
  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
  });

  static async registerUser(formData: RegisterPayload) {
    const endpoint = '/user/register';

    const response = await this.axiosInstance.post<AuthResponse>(endpoint, formData);

    return response.data
  }
}

export default AuthService;

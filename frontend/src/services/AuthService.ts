import axios from 'axios';

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPaylod {
  email: string;
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

    const response = await AuthService.axiosInstance.post<AuthResponse>(endpoint, formData);

    return response.data
  }

  static async loginUser(formData: LoginPaylod) {
    const endpoint = '/user/login';

    const response = await AuthService.axiosInstance.post<AuthResponse>(endpoint, formData);
    return response.data;
  }
}

export default AuthService;

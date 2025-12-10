import axios from 'axios';

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

class AuthService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  // Register a new user
  static async registerUser(formData: RegisterPayload) {
    const endpoint = '/user/register';
    const response = await AuthService.axiosInstance.post<AuthResponse>(
      endpoint,
      formData
    );
    return response.data;
  }

  // Log in an existing user
  static async loginUser(formData: LoginPayload) {
    const endpoint = '/user/login';
    const response = await AuthService.axiosInstance.post<AuthResponse>(
      endpoint,
      formData
    );
    return response.data;
  }

  // Get stored access token
  static getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Build authorization header for authenticated requests
  static getAuthConfig() {
    return {
      headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` }
    };
  }
}

export default AuthService;

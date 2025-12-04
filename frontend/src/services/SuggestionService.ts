import axios from 'axios';

export interface Person {
  id: string;
  name: string;
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
}

class SuggestionService {
  static axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
  });

  static async searchPeople(query: string): Promise<Person[]> {
    if (!query) return [];
    const response = await this.axiosInstance.get('/suggestion/people', {
      params: { query }
    });
    return response.data;
  }
}

export default SuggestionService;

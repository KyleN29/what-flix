import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import { parse } from 'csv-parse';
dotenv.config();

export interface Person {
  id: string;
  name: string;
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
}

class SearchSuggestionQueryService {
  baseURL = 'https://api.themoviedb.org/3';
  apiKey = process.env.TMDB_API_KEY;

  axiosInstance = axios.create({
    baseURL: this.baseURL,
    params: {
      api_key: this.apiKey
    }
  });

  actors: Person[] = [];

  constructor() {
    this.loadActors();
  }
  private async loadActors() {
    const parser = fs
      .createReadStream('./popular_actors.csv')
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          trim: true,
          relax_column_count: true,
        })
      );

    try {
      for await (const row of parser) {
        this.actors.push({
          id: row.id,
          name: row.name,
          known_for_department: row.known_for_department,
          profile_path: row.profile_path || null,
          popularity: Number(row.popularity),
        });
        console.log({
          id: row.id,
          name: row.name,
          known_for_department: row.known_for_department,
          profile_path: row.profile_path || null,
          popularity: Number(row.popularity),
        })
      }
    } catch (err: any) {
      console.error('CSV Load Error:', err.message);
    }
  }

}

const searchSuggestionQueryService = new SearchSuggestionQueryService();
export default searchSuggestionQueryService;

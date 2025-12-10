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
  // Base TMDB API information
  baseURL = 'https://api.themoviedb.org/3';
  apiKey = process.env.TMDB_API_KEY;

  // CSV file path and parser config
  private csvPath = 'src/data/people.csv';
  private csvParseConfig = {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true
  };

  // Axios instance configured with TMDB credentials
  axiosInstance = axios.create({
    baseURL: this.baseURL,
    params: {
      api_key: this.apiKey
    }
  });

  // Local in-memory list of actors loaded from CSV
  actors: Person[] = [];

  constructor() {
    this.loadActors();
  }

  // Load actors from CSV into memory
  private async loadActors() {
    const parser = fs
      .createReadStream(this.csvPath)
      .pipe(parse(this.csvParseConfig));

    try {
      for await (const row of parser) {
        this.actors.push({
          id: row.id,
          name: row.name,
          known_for_department: row.known_for_department,
          profile_path: row.profile_path || null,
          popularity: Number(row.popularity)
        });
      }
    } catch (err: any) {
      console.error('CSV Load Error:', err.message);
    }
  }

  // Search actor list by name prefix
  searchPeople(query: string): Person[] {
    if (!query) return [];

    const normalizedQuery = query.toLowerCase();

    return this.actors
      .filter((a) => a.name.toLowerCase().startsWith(normalizedQuery))
      .slice(0, 20);
  }
}

const searchSuggestionQueryService = new SearchSuggestionQueryService();
export default searchSuggestionQueryService;

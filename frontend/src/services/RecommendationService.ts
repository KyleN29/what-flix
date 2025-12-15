import axios from 'axios';
import UserService, { type GenreRank, type Person } from './UserService';
import { type Movie } from './MovieService';
import MovieService from './MovieService';
import { GenreScoringStrategy } from '../strategies/GenreScoringStrategy';
import { PeopleScoringStrategy } from '../strategies/PeopleScoringStrategy';
import type {
  ScoreContext,
  ScoringStrategy
} from '../strategies/ScoringStrategy';

export interface MovieScore extends Movie {
  score: number;
}

class RecommendationService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  static scoringStrategies: ScoringStrategy[] = [
    new GenreScoringStrategy(),
    new PeopleScoringStrategy()
  ];

  // Score a movie using all scoring strategies
  private static scoreMovie(
    movie: Movie,
    userGenres: GenreRank[],
    userPeople: Person[]
  ): MovieScore {
    const context: ScoreContext = {
      movie,
      userGenres,
      userPeople
    };
    let score = 0;
    for (const strategy of this.scoringStrategies) {
      score += strategy.score(context);
    }
    return { ...movie, score };
  }

  // Combine cast + crew and attach to movie
  private static attachPeopleToMovie(movie: Movie, credits: any) {
    const cast = credits.cast ?? [];
    const crew = credits.crew ?? [];
    const people = [...cast, ...crew];
    (movie as any).people = people;
  }

  static async getGeneralRecommendations() {
    const userGenreList = await UserService.getUserGenreList();
    const userPeopleList = await UserService.getLikedPeople();
    // Gather movies from multiple pages
    const numPages = 5;
    const movies: Movie[] = [];

    for (let i = 0; i < numPages; i++) {
      const results = await MovieService.discoverMovies({
        sort_by: 'popularity.desc',
        page: i + 1,
        include_adult: false,
        certification_country: 'US',
        'certification.gte': 'G',
        'certification.lte': 'R'
      });
      movies.push(...results);
    }
    const scoredMovies: MovieScore[] = [];

    for (const movie of movies) {
      const credits = await MovieService.getMovieCredits(movie.id);
      // Attach cast + crew to movie
      this.attachPeopleToMovie(movie, credits);
      // Score the movie
      const scored = this.scoreMovie(movie, userGenreList, userPeopleList);
      scoredMovies.push(scored);
    }
    scoredMovies.sort((a, b) => Number(b.score) - Number(a.score));
    return scoredMovies.slice(0, 30);
  }

  static async getLesserKnownRecommendations() {
    const userGenreList = await UserService.getUserGenreList();
    const userPeopleList = await UserService.getLikedPeople();

    // Sort genres by user preference
    const sortedGenres = userGenreList.sort((a, b) => a.rank - b.rank);

    const movies: Movie[] = [];
    const pagesPerGenre = 3;

    // Fetch movies for each preferred genre
    for (const genre of sortedGenres) {
      for (let page = 1; page <= pagesPerGenre; page++) {
        const results = await MovieService.discoverMovies({
          with_genres: genre.id,
          'vote_count.gte': 50,
          'vote_count.lte': 800,
          certification_country: 'US',
          'certification.gte': 'G',
          'certification.lte': 'R',
          'popularity.lte': 50,
          'primary_release_date.lte': '2024-12-31',
          page
        });

        movies.push(...results);
      }
    }

    // Remove duplicates
    const seen = new Set();
    const uniqueMovies = movies.filter((m) => !seen.has(m.id) && seen.add(m.id));

    const scoredMovies: MovieScore[] = [];

    for (const movie of uniqueMovies) {
      const credits = await MovieService.getMovieCredits(movie.id);

      // Attach cast + crew
      this.attachPeopleToMovie(movie, credits);

      // Score the movie
      const scored = this.scoreMovie(movie, userGenreList, userPeopleList);
      scoredMovies.push(scored);
    }

    scoredMovies.sort((a, b) => Number(b.score) - Number(a.score));
    return scoredMovies.slice(0, 30);
  }
}

export default RecommendationService;

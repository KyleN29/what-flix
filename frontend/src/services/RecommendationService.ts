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

  static async getGeneralRecommendations() {
    const userGenreList: GenreRank[] = await UserService.getUserGenreList();
    const userPeopleList: Person[] = await UserService.getLikedPeople();

    const numPages = 10;

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

    // Fetch credits for each movie and score them
    const scoredMovies: MovieScore[] = [];

    for (const movie of movies) {
      // Fetch cast + crew
      const credits = await MovieService.getMovieCredits(movie.id);

      // Combine cast and crew into a single list
      const people = [...(credits.cast ?? []), ...(credits.crew ?? [])];

      // Attach people to the movie object
      (movie as any).people = people;

      // Create scoring context
      const context: ScoreContext = {
        movie: movie,
        userGenres: userGenreList,
        userPeople: userPeopleList
      };

      // Compute the score
      var score = 0;
      for (const strategy of this.scoringStrategies) {
        score += strategy.score(context);
      }

      // Add to final list
      scoredMovies.push({ ...movie, score });
    }

    // Sort highest score
    scoredMovies.sort((a, b) => Number(b.score) - Number(a.score));

    return scoredMovies.slice(0, 30);
  }

  static async getLesserKnownRecommendations() {
    const userGenreList = await UserService.getUserGenreList();
    const userPeopleList = await UserService.getLikedPeople();

    // Sort genres by user rank
    const sortedGenres = userGenreList.sort((a, b) => a.rank - b.rank);

    const movies: Movie[] = [];
    const pagesPerGenre = 3;
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
    const uniqueMovies = movies.filter(
      (m) => !seen.has(m.id) && seen.add(m.id)
    );

    const scoredMovies: MovieScore[] = [];
    for (const movie of uniqueMovies) {
      const credits = await MovieService.getMovieCredits(movie.id);

      const cast = credits.cast ?? [];
      const crew = credits.crew ?? [];

      const people = [...cast, ...crew];
      (movie as any).people = people;
      // Create scoring context
      const context: ScoreContext = {
        movie: movie,
        userGenres: userGenreList,
        userPeople: userPeopleList
      };
      var score = 0;
      for (const strategy of this.scoringStrategies) {
        score += strategy.score(context);
      }

      scoredMovies.push({ ...movie, score });
    }

    scoredMovies.sort((a, b) => Number(b.score) - Number(a.score));

    return scoredMovies.slice(0, 30);
  }
}
export default RecommendationService;

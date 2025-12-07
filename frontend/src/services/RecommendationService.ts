import axios from 'axios';
import UserService, { type GenreRank, type Person } from './UserService';
import { type Movie } from './MovieService';
import MovieService from './MovieService';

export interface MovieScore extends Movie {
  score: number;
}

class RecommendationService {
  static axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  static async getGeneralRecommendations() {
    const userGenreList: GenreRank[] = await UserService.getUserGenreList();
    const userPeopleList: Person[] = await UserService.getLikedPeople();

    const numPages = 10;

    // Fetch popular movies
    const popularMovies: Movie[] = [];
    for (let i = 0; i < numPages; i++) {
      const page = await MovieService.getPopularMovies(i + 1);
      popularMovies.push(...page);
    }

    // Fetch credits for each movie and score them
    const scoredMovies: MovieScore[] = [];

    for (const movie of popularMovies) {
      // Fetch cast + crew
      const credits = await MovieService.getMovieCredits(movie.id);

      // Combine cast and crew into a single list
      const people = [...(credits.cast ?? []), ...(credits.crew ?? [])];

      // Attach people to the movie object
      (movie as any).people = people;

      // Compute the score
      const score = await this.scoreMovie(movie, userGenreList, userPeopleList);

      // Add to final list
      scoredMovies.push({ ...movie, score });
    }

    // Sort highest score
    scoredMovies.sort((a, b) => Number(b.score) - Number(a.score));

    return scoredMovies;
  }

  static async getLesserKnownRecommendations() {
    const userGenreList = await UserService.getUserGenreList();
    const userPeopleList = await UserService.getLikedPeople();

    const numPages = 30;

    const movies: Movie[] = [];
    for (let i = 0; i < numPages; i++) {
      const page = await MovieService.getPopularMovies(i + 1);
      movies.push(...page);
    }

    const hiddenGems = movies.filter((m) => {
      const year = Number(m.release_date.split('-')[0]);
      return year <= 2024 && m.vote_count > 90 && m.vote_count < 800 && m.popularity < 50 && m.adult == false;
    });

    const scoredMovies: MovieScore[] = [];
    for (const movie of hiddenGems) {
      const credits = await MovieService.getMovieCredits(movie.id);
      const cast = credits.cast ?? [];
      const crew = credits.crew ?? [];
      const people = [...cast, ...crew];
      (movie as any).people = people;

      const score = await this.scoreMovie(movie, userGenreList, userPeopleList);
      scoredMovies.push({ ...movie, score });
    }

    scoredMovies.sort((a, b) => Number(b.score) - Number(a.score));
    console.log(scoredMovies);
    return scoredMovies;
  }

  static async scoreMovie(
    movie: any,
    userGenreList: GenreRank[],
    userPeopleList: Person[]
  ) {
    let score = 0;
    const maxRank = userGenreList.length; // e.g., 1–10

    for (const movieGenreId of movie.genre_ids ?? []) {
      const match = userGenreList.find((g) => g.id === movieGenreId);
      if (match) {
        // Higher-ranked genres get more points
        const genreScore = (maxRank - match.rank + 1) * 10;
        score += genreScore;
      }
    }

    const moviePeople = movie.people ?? [];

    for (const person of moviePeople) {
      if (userPeopleList.find((p) => p.person_id === person.id)) {
        score += 25;
      }
    }

    return score;
  }
}

export default RecommendationService;

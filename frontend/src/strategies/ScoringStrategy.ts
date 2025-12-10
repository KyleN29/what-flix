import { type GenreRank, type Person } from '../services/UserService';

export interface ScoreContext {
  movie: any;
  userGenres: GenreRank[];
  userPeople: Person[];
}

export interface ScoringStrategy {
  score(context: ScoreContext): number;
}

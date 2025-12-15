import { type ScoringStrategy, type ScoreContext } from "./ScoringStrategy";

export class GenreScoringStrategy implements ScoringStrategy {
  score({ movie, userGenres }: ScoreContext) {
    let score = 0;
    const maxRank = userGenres.length;

    for (const genreId of movie.genre_ids ?? []) {
      const match = userGenres.find(g => g.id === genreId);
      if (match) {
        score += (maxRank - match.rank + 1) * 10;
      }
    }
    console.log("genre :)")
    return score;
  }
}
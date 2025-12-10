import { type ScoringStrategy, type ScoreContext } from "./ScoringStrategy";


export class PeopleScoringStrategy implements ScoringStrategy {
  score({ movie, userPeople }: ScoreContext): number {
    let score = 0;

    for (const person of movie.people ?? []) {
      if (userPeople.find(p => p.person_id === person.id)) {
        score += 25;
      }
    }

    return score;
  }
}

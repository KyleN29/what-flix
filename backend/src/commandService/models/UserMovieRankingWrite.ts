import { Schema, model, Document } from 'mongoose';

export interface IUserMovieRankingWrite extends Document {
  user_id: string;
  movie_id: number;
  rating: number;
}

const UserMovieRankingWriteSchema = new Schema<IUserMovieRankingWrite>({
  user_id: {
    type: String,
    required: true,
    index: true
  },
  movie_id: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

export default model<IUserMovieRankingWrite>('UserMovieRanking', UserMovieRankingWriteSchema);
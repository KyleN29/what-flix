import { Schema, model, Document } from 'mongoose';

export interface IMoviesSeenRead extends Document {
  userId: string;
  movieId: number;
}

const MoviesSeenReadSchema = new Schema<IMoviesSeenRead>({
  userId: { type: String, required: true, index: true },
  movieId: { type: Number, required: true }
});

export default model<IMoviesSeenRead>(
  'MoviesSeenRead',
  MoviesSeenReadSchema
);
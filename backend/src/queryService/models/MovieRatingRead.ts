import { Schema, model, Document } from 'mongoose';

export interface IMovieRatingRead extends Document {
  userId: string;
  movieId: number;
  rating: number;
}

const MovieRatingReadSchema = new Schema<IMovieRatingRead>({
  userId: { type: String, required: true, index: true },
  movieId: { type: Number, required: true },
  rating: { type: Number, required: true }
});

export default model<IMovieRatingRead>(
  'MovieRatingRead',
  MovieRatingReadSchema
);
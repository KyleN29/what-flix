import { Schema, model, Document } from 'mongoose';

export interface IGenrePreferencesRead extends Document {
  user_id: string;
  genre_rankings: {
    rank: number;
    name: string;
  }[];
}
const GenreRankSchema = new Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);

const GenrePreferencesReadSchema = new Schema<IGenrePreferencesRead>({
  user_id: { type: String, required: true, unique: true, index: true },

  genre_rankings: {
    type: [GenreRankSchema],
    required: true,
    default: []
  }
});

export default model<IGenrePreferencesRead>(
  'GenrePreferencesRead',
  GenrePreferencesReadSchema
);

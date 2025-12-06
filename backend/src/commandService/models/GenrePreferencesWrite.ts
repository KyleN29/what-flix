import { Schema, model, Document } from 'mongoose';

export interface IGenreRank {
  id: Number;
  rank: number;
  name: string;
}

export interface IGenrePreferencesWrite extends Document {
  user_id: string;
  genre_rankings: IGenreRank[]
}

const GenreRankSchema = new Schema(
  {
    id: {type: Number, required: true},
    rank: { type: Number, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);


const GenrePreferencesWriteSchema = new Schema<IGenrePreferencesWrite>({
  user_id: { type: String, required: true, index: true, unique: true },
  genre_rankings: {
    type: [GenreRankSchema]
  }
});

export default model<IGenrePreferencesWrite>(
  'GenrePreferencesWrite',
  GenrePreferencesWriteSchema
);

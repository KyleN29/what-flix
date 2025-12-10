import { Schema, model, Document } from 'mongoose';

export interface IGenreBlacklist {
  rank: number;
  name: string;
}

export interface IGenreBlacklistWrite extends Document {
  user_id: string;
  blacklisted_genres: IGenreBlacklist[]
}

const GenreBlacklistSchema = new Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);

const GenreBlacklistWriteSchema = new Schema<IGenreBlacklistWrite>({
  user_id: { type: String, required: true, index: true, unique: true },
  blacklisted_genres: {
    type: [GenreBlacklistSchema]
  }
});

export default model<IGenreBlacklistWrite>(
  'GenreBlacklistWrite',
  GenreBlacklistWriteSchema
);

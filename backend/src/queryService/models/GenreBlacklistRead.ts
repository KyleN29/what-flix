import { Schema, model, Document } from 'mongoose';

export interface IGenreBlacklistRead extends Document {
  user_id: string;
  blacklisted_genres: Array<{ rank: number; name: string }>;
}

const GenreBlacklistReadSchema = new Schema<IGenreBlacklistRead>({
  user_id: { type: String, required: true, index: true, unique: true },
  blacklisted_genres: [
    {
      rank: { type: Number, required: true },
      name: { type: String, required: true },
      _id: false
    }
  ]
});

export default model<IGenreBlacklistRead>(
  'GenreBlacklistRead',
  GenreBlacklistReadSchema
);

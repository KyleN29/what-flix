import { Schema, model, Document } from 'mongoose';

export interface IWatchLaterRead extends Document {
  userId: string;
  movieId: number;
}

const WatchLaterReadSchema = new Schema<IWatchLaterRead>({
  userId: { type: String, required: true, index: true },
  movieId: { type: Number, required: true }
});

export default model<IWatchLaterRead>(
  'WatchLaterRead',
  WatchLaterReadSchema
);
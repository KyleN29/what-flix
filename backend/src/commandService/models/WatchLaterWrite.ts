import { Schema, model, Document } from 'mongoose';

export interface IWatchLaterWrite extends Document {
  user_id: string;
  movie_id: number;
}

const WatchLaterWriteSchema = new Schema<IWatchLaterWrite>({
  user_id: {
    type: String,
    required: true,
    index: true
  },
  movie_id: {
    type: Number,
    required: true
  }
});

// Prevents duplicate entries
WatchLaterWriteSchema.index({ user_id: 1, movie_id: 1 }, { unique: true });

export default model<IWatchLaterWrite>('WatchLater', WatchLaterWriteSchema);
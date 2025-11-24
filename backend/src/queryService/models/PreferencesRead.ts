import { Schema, model, Document } from 'mongoose';

export interface IPreferencesRead extends Document {
  userId: string;
  genres: string[];
  language: string;
}

const PreferencesReadSchema = new Schema<IPreferencesRead>({
  userId: { type: String, required: true, index: true, unique: true },
  genres: [{ type: String }],
  language: { type: String }
});

export default model<IPreferencesRead>(
  'PreferencesRead',
  PreferencesReadSchema
);

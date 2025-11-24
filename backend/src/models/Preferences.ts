import { Schema, model, Document } from 'mongoose';

export interface IPreferences extends Document {
  userId: string;
  genres: string[];
  language: string;
}

const PreferencesSchema = new Schema<IPreferences>({
  userId: { type: String, required: true },
  genres: [{ type: String }],
  language: { type: String }
});

export default model<IPreferences>('Preferences', PreferencesSchema);

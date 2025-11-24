import { Schema, model, Document } from 'mongoose';

export interface IPreferencesWrite extends Document {
  userId: string;
  genres: string[];
  language: string;
}

const PreferencesWriteSchema = new Schema<IPreferencesWrite>({
  userId: { type: String, required: true, index: true, unique: true },
  genres: [{ type: String }],
  language: { type: String }
});

export default model<IPreferencesWrite>(
  'PreferencesWrite',
  PreferencesWriteSchema
);

import { Schema, model, Document } from 'mongoose';

export interface IPreferencesWrite extends Document {
  user_id: string;
  genre_code: string;
  rank: Number;
}

const PreferencesWriteSchema = new Schema<IPreferencesWrite>({
  user_id: { type: String, required: true, index: true, unique: true },
  genre_code: {type: String, required: true},
  rank: { type: Number, required: true}
});

export default model<IPreferencesWrite>(
  'PreferencesWrite',
  PreferencesWriteSchema
);

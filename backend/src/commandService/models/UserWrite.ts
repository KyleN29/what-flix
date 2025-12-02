import { Schema, model, Document } from 'mongoose';

export interface IUserWrite extends Document {
  user_id: string;
  email: string;
  username: string;
  created_at: Date;
}

const UserWriteSchema = new Schema<IUserWrite>({
  user_id: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  created_at: {type: Date, required: true}
});

export default model<IUserWrite>('UserWrite', UserWriteSchema);

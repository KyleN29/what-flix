import { Schema, model, Document } from 'mongoose';

export interface IUserWrite extends Document {
  email: string;
  username: string;
  created_at: Date;
}

const UserWriteSchema = new Schema<IUserWrite>({
  email: { type: String, required: true, index: true, unique: true },
  username: { type: String, required: true },
  created_at: {type: Date, required: true}
});

export default model<IUserWrite>('UserWrite', UserWriteSchema);

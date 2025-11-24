import { Schema, model, Document } from 'mongoose';

export interface IUserWrite extends Document {
  email: string;
  name: string;
}

const UserWriteSchema = new Schema<IUserWrite>({
  email: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true }
});

export default model<IUserWrite>('UserWrite', UserWriteSchema);

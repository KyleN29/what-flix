import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true }
});

export default model<IUser>('User', UserSchema);

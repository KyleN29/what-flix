import { Schema, model, Document } from 'mongoose';

export interface IUserAuth extends Document {
  user_id: string
  password_hash: string;
}

const UserAuthSchema = new Schema<IUserAuth>({
  user_id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  }
});

export default model<IUserAuth>('UserAuth', UserAuthSchema);

import { Schema, model, Document } from 'mongoose';

export interface IUserAuthRead extends Document {
  user_id: string;
  password_hash: string;
}

const UserAuthReadSchema = new Schema<IUserAuthRead>({
  user_id: {
    type: String,
    required: true,
    index: true
  },
  password_hash: {
    type: String,
    required: true
  }
});

export default model<IUserAuthRead>('UserAuthRead', UserAuthReadSchema);

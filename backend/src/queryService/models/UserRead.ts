import { Schema, model, Document } from "mongoose";

export interface IUserRead extends Document {
  email: string;
  username: string;
  created_at: Date;
}

const UserReadSchema = new Schema<IUserRead>({
  email: { type: String, required: true, index: true, unique: true },
  username: { type: String, required: true },
  created_at: {type: Date, required: true}
});

export default model<IUserRead>("UserRead", UserReadSchema);

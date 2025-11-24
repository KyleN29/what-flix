import { Schema, model, Document } from "mongoose";

export interface IUserRead extends Document {
  email: string;
  name: string;
}

const UserReadSchema = new Schema<IUserRead>({
  email: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true }
});

export default model<IUserRead>("UserRead", UserReadSchema);

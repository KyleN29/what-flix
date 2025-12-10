import { Schema, model, Document } from 'mongoose';

export interface IProfilePictureWrite extends Document {
  user_id: string;
  profile_pic_url: string;
  uploaded_at: number;
}

const ProfilePictureWriteSchema = new Schema<IProfilePictureWrite>({
  user_id: { type: String, required: true, index: true, unique: true },
  profile_pic_url: { type: String, required: true },
  uploaded_at: { type: Number, required: true }
});

export default model<IProfilePictureWrite>(
  'ProfilePictureWrite',
  ProfilePictureWriteSchema
);


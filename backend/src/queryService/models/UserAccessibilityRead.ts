import { Schema, model, Document } from 'mongoose';

export interface IAccessibilityRead extends Document {
  userId: string;
  textSize: number;
  darkMode: boolean;
  highContrast: boolean;
}

const AccessibilityReadSchema = new Schema<IAccessibilityRead>({
  userId: { type: String, required: true, index: true, unique: true },
  textSize: { type: Number, required: true },
  darkMode: { type: Boolean, required: true },
  highContrast: { type: Boolean, required: true }
});

export default model<IAccessibilityRead>(
  'AccessibilityRead',
  AccessibilityReadSchema
);
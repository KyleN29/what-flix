import { Schema, model, Document } from 'mongoose';

export interface Person {
  person_id: Number;
  name: string;
}

export interface IPeoplePreferencesRead extends Document {
  user_id: string;
  liked_people: Person[];
}

const PersonSchema = new Schema<Person>({
  person_id: { type: Number, required: true },
  name: { type: String, required: true }
});

const PeoplePreferencesReadSchema = new Schema<IPeoplePreferencesRead>({
  user_id: { type: String, required: true, index: true, unique: true },
  liked_people: [PersonSchema]
});

export default model<IPeoplePreferencesRead>(
  'PeoplePreferencesRead',
  PeoplePreferencesReadSchema
);

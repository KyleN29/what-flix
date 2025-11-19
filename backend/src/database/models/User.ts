import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    streamingServices: {
      type: [String],
      default: []
    },

    likedMovies: [
      {
        movieId: { type: Number, required: true },
        likedAt: { type: Date, default: Date.now }
      }
    ],

    dislikedMovies: [
      {
        movieId: { type: Number, required: true },
        dislikedAt: { type: Date, default: Date.now }
      }
    ],

    ratedMovies: [
      {
        movieId: { type: Number, required: true },
        rating: { type: Number, min: 1, max: 10 },
        ratedAt: { type: Date, default: Date.now }
      }
    ],

    seenMovies: [
      {
        movieId: { type: Number, required: true },
        seenAt: { type: Date, default: Date.now }
      }
    ],

    preferredGenres: [
      {
        genreId: { type: Number, required: true }, // TMDB genre ID
        rank: { type: Number, required: true } // 1 = highest rank
      }
    ],

    preferredActors: {
      type: [Number], // TMDB actor IDs
      default: []
    },

    preferredDirectors: {
      type: [Number], // TMDB director IDs
      default: []
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);

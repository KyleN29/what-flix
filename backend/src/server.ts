import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import accountCommandController from './commandService/controllers/accountCommandController.js';
import accountQueryController from './queryService/controllers/accountQueryController.js';
import genreQueryController from './queryService/controllers/genreQueryController.js';
import movieQueryController from './queryService/controllers/movieQueryController.js';
import searchSuggestionQueryController from './queryService/controllers/searchSuggestionQueryController.js';
import eventHandler from './queryService/handlers/eventHandler.js';

import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';

// Resolve dist folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', '..', 'frontend', 'dist');

const app = express();
const port = 3000;

// Apply middleware
app.use(express.json());
app.use(cors());
app.use(express.static(distPath));

// Connect to database
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.log('MongoDB connection error: ', err);
  });

// Serve frontend entry point
app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Register application routes
app.use('/events', eventHandler);
app.use('/user', accountCommandController);
app.use('/user', accountQueryController);
app.use('/genre', genreQueryController);
app.use('/movie', movieQueryController);
app.use('/suggestion', searchSuggestionQueryController);

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

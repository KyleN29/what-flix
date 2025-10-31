import express from 'express';
import MovieService from '../services/MovieService.js';
import type { MovieResponse } from '../services/MovieService.js';

const router = express.Router();

router.get('/popular', async (req, res) => {
  try {
    const data: MovieResponse = await MovieService.getPopularMovies();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

export default router;

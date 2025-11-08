import express from 'express';
import MovieService from '../services/MovieService.js';
import type { Movie } from '../services/MovieService.js';

const router = express.Router();

router.get('/popular', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const data: Movie[] = await MovieService.getPopularMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

router.get('/detail', async (req, res) => {
  try {
    const movieId = req.query.movieId as string;
    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required' });
    }
    const data: Movie = await MovieService.getMovieDetail(movieId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie detail' });
  }
});

export default router;

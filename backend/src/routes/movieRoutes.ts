import express from 'express';
import MovieService from '../services/MovieService.js';
import type { Movie, Trailer } from '../services/MovieService.js';

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

router.get('/trailer', async (req, res) => {
  try {
    const movieId = req.query.movieId as string;
    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required' });
    }
    
    const data: Trailer[] = await MovieService.getMovieTrailers(movieId);
    
    // Find official YouTube trailer first
    const officialTrailer = data.find(trailer => trailer.site === "YouTube" && trailer.official);
    
    if (officialTrailer) {
      return res.json(officialTrailer);
    }
    
    // If no official trailer, get the last YouTube trailer
    const youtubeTrailers = data.filter(trailer => trailer.site === "YouTube");
    
    if (youtubeTrailers.length > 0) {
      const lastTrailer = youtubeTrailers[youtubeTrailers.length - 1];
      return res.json(lastTrailer);
    }
    
    // No YouTube trailers at all
    return res.status(404).json({ message: 'No YouTube trailer found' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie trailer' });
  }
});

export default router;

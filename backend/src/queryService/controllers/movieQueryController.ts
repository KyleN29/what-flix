import { Router, type Request, type Response } from 'express';
import movieQueryService, {
  type Movie,
  type MovieDetail,
  type Trailer
} from '../services/movieQueryService.js';

const router = Router();

router.get('/popular', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const data: Movie[] = await movieQueryService.getPopularMovies(page);
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
    const data: MovieDetail = await movieQueryService.getMovieDetail(movieId);
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

    const data: Trailer[] = await movieQueryService.getMovieTrailers(movieId);

    // Find official YouTube trailer first
    const officialTrailer = data.find(
      (trailer) => trailer.site === 'YouTube' && trailer.official && trailer.type == "Trailer"
    );

    if (officialTrailer) {
      return res.json(officialTrailer);
    }

    // If no official trailer, get the last YouTube trailer
    const youtubeTrailers = data.filter(
      (trailer) => trailer.site === 'YouTube'
    );

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

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query as string;
    const page = Number(req.query.page) || 1;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const data: Movie[] = await movieQueryService.searchMovies(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching movies' });
  }
});


router.get('/credits', async (req, res) => {
  try {
    const movieId = req.query.movieId as string;

  if (!movieId) {
      return res.status(400).json({ error: 'movieId query parameter is required' });
    }

    const credits = await movieQueryService.getMovieCredits(movieId);

    return res.status(200).json(credits);
  } catch (error: any) {
    console.error('Error fetching movie credits:', error);
    return res.status(500).json({ error: 'Failed to fetch movie credits' });
  }
});


export default router;

import { Router, type Request, type Response } from 'express';
import accountQueryService from '../services/accountQueryService.js'
import GenrePreferencesRead from '../models/GenrePreferencesRead.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const user = await accountQueryService.getUser(req.params.id);
  res.json(user);
});

router.get('/:id/watch_later', async (req: Request, res: Response) => {
  const watchList = await accountQueryService.getWatchList(req.params.id);
  res.json(watchList);
});

router.get('/:id/genre_ranking/:genre_code', async (req: Request, res: Response) => {
  const preferences = await accountQueryService.getPreferences(req.params.id);
  const genreCode = req.params.genre_code;
  const genrePreference = preferences.find(pref => pref.genre_code === genreCode);
  res.json(genrePreference);
});

router.get('/genre_ranking', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;
  const genres = req.body;

  const prefs = await GenrePreferencesRead.findOne({user_id: userId})

  res.json(prefs?.genre_rankings);
});


router.get('/:id/movie_rating/:movie_id', async (req: Request, res: Response) => {
  const movieRating = await accountQueryService.getMovieRanking(req.params.id, req.params.movie_id);
  res.json(movieRating);
});

export default router;

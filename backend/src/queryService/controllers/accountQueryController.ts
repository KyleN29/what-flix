import { Router, type Request, type Response } from 'express';
import accountQueryService from '../services/accountQueryService.js'
import GenrePreferencesRead from '../models/GenrePreferencesRead.js';
import PeoplePreferencesRead from '../models/PeoplePreferencesRead.js';

import { authMiddleware } from '../../middleware/authMiddleware.js';
const router = Router();

router.get('/genre_ranking', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;

  const prefs = await GenrePreferencesRead.findOne({user_id: userId})

  res.json(prefs?.genre_rankings);
});

router.get('/liked_people', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;

  const prefs = await PeoplePreferencesRead.findOne({user_id: userId})

  res.json(prefs?.liked_people);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;
  const user = await accountQueryService.getUser(userId);
  res.json(user);
});

router.get('/watch_later', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;
  const watchList = await accountQueryService.getWatchList(userId);
  res.json(watchList);
});

router.get('/genre_ranking/:genre_code', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;
  const preferences = await accountQueryService.getPreferences(userId);
  const genreCode = req.params.genre_code;
  const genrePreference = preferences.find(pref => pref.genre_code === genreCode);
  res.json(genrePreference);
});

router.get('/movie_rating/:movie_id', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user.user_id;
  const movieRating = await accountQueryService.getMovieRanking(userId, req.params.movie_id);
  res.json(movieRating);
});

router.get('/genre_blacklist', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.user_id;
    const blacklist = await accountQueryService.getGenreBlacklist(userId);
    res.json(blacklist?.blacklisted_genres || []);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

router.get('/profile_picture', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.user_id;
    const profilePic = await accountQueryService.getProfilePicture(userId);
    res.json(profilePic?.profile_pic_url || null);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

export default router;

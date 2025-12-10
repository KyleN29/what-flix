import { Router, type Request, type Response } from 'express';
import accountQueryService from '../services/accountQueryService.js';
import GenrePreferencesRead from '../models/GenrePreferencesRead.js';
import PeoplePreferencesRead from '../models/PeoplePreferencesRead.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Get genre rankings for authenticated user
router.get(
  '/genre_ranking',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const prefs = await GenrePreferencesRead.findOne({ user_id: userId });
    res.json(prefs?.genre_rankings);
  }
);

// Get liked people for authenticated user
router.get(
  '/liked_people',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const prefs = await PeoplePreferencesRead.findOne({ user_id: userId });
    res.json(prefs?.liked_people);
  }
);

// Get user information
router.get('/:id', async (req: Request, res: Response) => {
  const user = await accountQueryService.getUser(req.params.id);
  res.json(user);
});

// Get user's watch later list
router.get('/:id/watch_later', async (req: Request, res: Response) => {
  const watchList = await accountQueryService.getWatchList(req.params.id);
  res.json(watchList);
});

// Get user's genre ranking for a specific genre
router.get(
  '/:id/genre_ranking/:genre_code',
  async (req: Request, res: Response) => {
    const preferences = await accountQueryService.getPreferences(req.params.id);
    const genreCode = req.params.genre_code;
    const genrePreference = preferences.find(
      (pref) => pref.genre_code === genreCode
    );
    res.json(genrePreference);
  }
);

// Get user's movie rating for a specific movie
router.get(
  '/:id/movie_rating/:movie_id',
  async (req: Request, res: Response) => {
    const movieRating = await accountQueryService.getMovieRanking(
      req.params.id,
      req.params.movie_id
    );
    res.json(movieRating);
  }
);

export default router;

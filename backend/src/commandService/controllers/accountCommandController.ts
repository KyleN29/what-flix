import { Router, type Request, type Response } from 'express';
import accountCommandService from '../services/accountCommandService.js';
import eventBus from '../eventBus/EventBus.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// Create user
router.post('/', async (req: Request, res: Response) => {
  const user = await accountCommandService.createUser(req.body);
  res.json({ status: 'success' });
});

// Update genre ranking
router.put(
  '/genre_ranking',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const genres = req.body;

    if (!Array.isArray(genres)) {
      return res.status(400).json({ error: 'Body must be an array of genres' });
    }

    await accountCommandService.updateGenrePreferences(userId, genres);
    res.json({ status: 'success' });
  }
);

// Update liked people
router.put(
  '/liked_people',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const people = req.body;

    if (!Array.isArray(people)) {
      return res.status(400).json({ error: 'Body must be an array of people' });
    }

    await accountCommandService.updatePeoplePreferences(userId, people);
    res.json({ status: 'success' });
  }
);

router.put(
  '/genre_blacklist',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const genres = req.body;

    if (!Array.isArray(genres)) {
      return res.status(400).json({ error: 'Body must be an array of genres' });
    }

    const blacklist = await accountCommandService.updateGenreBlacklist(
      userId,
      genres
    );

    res.json({ status: 'success' });
  }
);

// Login user
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await accountCommandService.login(email, password);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// Register user
router.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const result = await accountCommandService.register(
      email,
      username,
      password
    );
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// Add movie rating
router.post('/:id/add_movie_rating', async (req: Request, res: Response) => {
  const { movie_id, rating } = req.body;
  const dto = { movie_id, rating };

  const user_id = req.params.id;
  if (user_id == undefined) {
    throw new Error('Invalid user id');
  }

  try {
    const result = await accountCommandService.updateMovieRanking(user_id, dto);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// Remove movie rating
router.post('/:id/remove_movie_rating', async (req: Request, res: Response) => {
  const user_id = req.params.id;
  if (user_id == undefined) {
    throw new Error('Invalid user id');
  }

  const movie_id = req.body;

  try {
    const result = await accountCommandService.deleteMovieRanking(
      user_id,
      movie_id
    );
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// Add watch later
router.post('/:id/add_watch_later', async (req: Request, res: Response) => {
  const user_id = req.params.id;
  if (user_id == undefined) {
    throw new Error('Invalid user id');
  }

  const movie_id = req.body;

  try {
    const result = await accountCommandService.addWatchLater(user_id, movie_id);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// Remove watch later
router.post('/:id/remove_watch_later', async (req: Request, res: Response) => {
  const user_id = req.params.id;
  if (user_id == undefined) {
    throw new Error('Invalid user id');
  }

  const movie_id = req.body;

  try {
    const result = await accountCommandService.removeWatchLater(
      user_id,
      movie_id
    );
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

router.put(
  '/profile_picture',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const { profile_pic_url } = req.body;

    if (!profile_pic_url) {
      return res.status(400).json({ error: 'profile_pic_url is required' });
    }

    try {
      const result = await accountCommandService.updateProfilePicture(
        userId,
        profile_pic_url
      );
      return res.json({ status: 'success', profile_pic_url: result.profile_pic_url });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
);

router.put(
  '/update_email',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const { newEmail } = req.body;

    if (!newEmail || typeof newEmail !== 'string') {
      return res.status(400).json({ error: 'newEmail is required and must be a string' });
    }

    try {
      const result = await accountCommandService.updateEmail(userId, newEmail);
      return res.json({ status: 'success', email: result.email });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
);

router.put(
  '/update_password',
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user.user_id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'currentPassword and newPassword are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
      await accountCommandService.updatePassword(userId, currentPassword, newPassword);
      return res.json({ status: 'success', message: 'Password updated successfully' });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
);

export default router;

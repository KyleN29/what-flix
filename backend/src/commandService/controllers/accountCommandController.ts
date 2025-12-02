import { Router, type Request, type Response } from 'express';
import accountCommandService from '../services/accountCommandService.js'
import eventBus from '../eventBus/EventBus.js';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const user = await accountCommandService.createUser(req.body);
  res.json({ status: 'success' });
});

router.put('/:id/genre_ranking', async (req: Request, res: Response) => {
  const prefs = await accountCommandService.updatePreferences(
    req.params.id,
    req.body
  );

  res.json({ status: 'success' });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await accountCommandService.login(email, password);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const result = await accountCommandService.register(email, username, password);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({error: err.message});
  }
}) 

router.post('/:id/add_movie_rating', async (req: Request, res: Response) => {
  const {movie_id, rating} = req.body;
  const dto = {
    movie_id,
    rating,
  };

  const user_id = req.params.id;
  if(user_id == undefined) {
    throw new Error("Invalid user id");
  }

  try{
    const result = await accountCommandService.updateMovieRanking(user_id, dto);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/:id/remove_movie_rating', async (req: Request, res: Response) => {
  const user_id = req.params.id;
  if(user_id == undefined) {
    throw new Error("Invalid user id");
  }

  const movie_id = req.body;

  try{
    const result = await accountCommandService.deleteMovieRanking(user_id, movie_id);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/:id/add_watch_later', async (req: Request, res: Response) => {
  const user_id = req.params.id;
  if(user_id == undefined) {
    throw new Error("Invalid user id");
  }

  const movie_id = req.body;

  try{
    const result = await accountCommandService.addWatchLater(user_id, movie_id);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/:id/remove_watch_later', async (req: Request, res: Response) => {
  const user_id = req.params.id;
  if(user_id == undefined) {
    throw new Error("Invalid user id");
  }

  const movie_id = req.body;

  try{
    const result = await accountCommandService.removeWatchLater(user_id, movie_id);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }

});

export default router;

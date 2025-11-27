import { Router, type Request, type Response } from 'express';
import genreQueryService, {type Genre} from '../services/genreQueryService.js';

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const data: Genre[] = await genreQueryService.getGenres();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genre list' });
  }
});


export default router;

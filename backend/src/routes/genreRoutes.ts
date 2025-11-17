import express from 'express';
import GenreService from '../services/GenreService.js';
import type { Genre } from '../services/GenreService.js';

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const data: Genre[] = await GenreService.getGenres();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genre list' });
  }
});

export default router;

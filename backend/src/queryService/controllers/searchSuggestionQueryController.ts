import { Router, type Request, type Response } from 'express';
import searchSuggestionQueryService from '../services/searchSuggestionQueryService.js';

const router = Router();

router.get('/people', async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = searchSuggestionQueryService.searchPeople(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching people suggestions' });
  }
});

export default router;

import { Router, type Request, type Response } from 'express';
import accountQueryService from '../services/accountQueryService.js'

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const user = await accountQueryService.getUser(req.params.id);
  res.json(user);
});

export default router;

import { Router, type Request, type Response } from 'express';
import accountCommandService from '../services/accountCommandService.js'
import eventBus from '../eventBus/EventBus.js';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const user = await accountCommandService.createUser(req.body);
  res.json({ status: 'success' });
});

router.put('/:id/preferences', async (req: Request, res: Response) => {
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


export default router;

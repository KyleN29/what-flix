import { Router, type Request, type Response } from 'express';
import accountCommandService from '../../services/command/accountCommandService.js';
import eventBus from '../../eventBus/EventBus.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const user = await accountCommandService.createUser(req.body);

  await eventBus.publish('UserCreated', { userId: user.id });

  res.json({ status: 'success' });
});

router.put('/:id/preferences', async (req: Request, res: Response) => {
  const prefs = await accountCommandService.updatePreferences(
    req.params.id,
    req.body
  );

  await eventBus.publish('PreferencesUpdated', {
    userId: req.params.id,
    preferences: prefs
  });

  res.json({ status: 'success' });
});

export default router;

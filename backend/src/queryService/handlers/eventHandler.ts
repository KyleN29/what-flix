import { Router, type Request, type Response } from 'express';
import UserRead from '../models/UserRead.js';
import PreferencesRead from '../models/PreferencesRead.js';

const router = Router();

router.post('/events', async (req: Request, res: Response) => {
  const event = req.body;

  console.log('Received event:', event.type);

  try {
    switch (event.type) {
      case 'UserCreated': {
        const { userId, email, name } = event.payload;

        await UserRead.findOneAndUpdate(
          { userId },
          { userId, email, name },
          { upsert: true }
        );

        break;
      }

      case 'PreferencesUpdated': {
        const { userId, preferences } = event.payload;

        await PreferencesRead.findOneAndUpdate(
          { userId },
          { userId, ...preferences },
          { upsert: true }
        );

        break;
      }
    }

    res.send({ status: 'ok' });
  } catch (err) {
    console.error('Error processing event:', err);
    res.status(500).send({ status: 'error' });
  }
});

export default router;

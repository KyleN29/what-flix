import { Router, type Request, type Response } from 'express';
import UserRead from '../models/UserRead.js';
import UserAuthRead from '../models/UserAuthRead.js';
import GenrePreferencesRead from '../models/GenrePreferencesRead.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const event = req.body;

  console.log('Received event:', event.type);

  try {
    switch (event.type) {
      case 'UserCreated': {
        const { user_id, email, username } = event.payload;

        await UserRead.findOneAndUpdate(
          { user_id },
          { user_id, email, username },
          { upsert: true }
        );

        break;
      }
      case 'UserAuthCreated': {
        const { user_id, password_hash } = event.payload;

        await UserAuthRead.findOneAndUpdate(
          { user_id },
          { user_id, password_hash },
          { upsert: true }
        );

        break;
      }

      case 'GenrePreferencesUpdated': {
        const { user_id, preferences } = event.payload;

        await GenrePreferencesRead.findOneAndUpdate(
          { user_id },
          { user_id, ...preferences },
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

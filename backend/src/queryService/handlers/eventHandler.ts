import { Router, type Request, type Response } from 'express';
import UserRead from '../models/UserRead.js';
import UserAuthRead from '../models/UserAuthRead.js';
import GenrePreferencesRead from '../models/GenrePreferencesRead.js';
import PeoplePreferencesRead from '../models/PeoplePreferencesRead.js';
import GenreBlacklistRead from '../models/GenreBlacklistRead.js';
import ProfilePictureRead from '../models/ProfilePictureRead.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  // Extract incoming event
  const event = req.body;
  console.log('Received event:', event.type);

  try {
    switch (event.type) {
      // Create or update user profile
      case 'UserCreated': {
        const { user_id, email, username } = event.payload;

        await UserRead.findOneAndUpdate(
          { user_id },
          { user_id, email, username },
          { upsert: true }
        );

        break;
      }

      // Create or update auth credentials
      case 'UserAuthCreated': {
        const { user_id, password_hash } = event.payload;

        await UserAuthRead.findOneAndUpdate(
          { user_id },
          { user_id, password_hash },
          { upsert: true }
        );

        break;
      }

      // Update genre preferences
      case 'GenrePreferencesUpdated': {
        const { user_id, preferences } = event.payload;

        await GenrePreferencesRead.findOneAndUpdate(
          { user_id },
          { user_id, ...preferences },
          { upsert: true }
        );

        break;
      }

      // Update people preferences
      case 'PeoplePreferencesUpdated': {
        const { user_id, preferences } = event.payload;

        await PeoplePreferencesRead.findOneAndUpdate(
          { user_id },
          { user_id, ...preferences },
          { upsert: true }
        );

        break;
      }
      case 'GenreBlacklistUpdated': {
        const { user_id, blacklist } = event.payload;

        await GenreBlacklistRead.findOneAndUpdate(
          { user_id },
          { user_id, ...blacklist },
          { upsert: true }
        );

        break;
      }
      case 'ProfilePictureUpdated': {
        const { user_id, pictureData } = event.payload;

        await ProfilePictureRead.findOneAndUpdate(
          { user_id },
          { user_id, profile_pic_url: pictureData },
          { upsert: true }
        );

        break;
      }
      case 'UserEmailUpdated': {
        const { user_id, email } = event.payload;

        await UserRead.findOneAndUpdate(
          { user_id },
          { user_id, email }
        );
        break;
      }
      case 'UserPasswordUpdated': {
        const { user_id, password_hash } = event.payload;
        
        await UserAuthRead.findOneAndUpdate(
          { user_id },
          { user_id, password_hash },
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

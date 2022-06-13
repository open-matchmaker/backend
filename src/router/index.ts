import { Router } from 'express';

import user from './user';
import session from './session';
import post from './post';
import game from './game';

const router = Router();

router.get('/', (_req, res) => res.send('Hello World! matchmaker-api'));

router.use('/user', user);
router.use('/session', session);
router.use('/post', post);
router.use('/game', game);

export default router;

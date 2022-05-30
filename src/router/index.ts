import { Router } from 'express';

import user from './user';
import session from './session';

const router = Router();

router.get('/', (_req, res) => res.send('Hello World! matchmaker-api'));

router.use('/user', user);
router.use('/session', session);

export default router;

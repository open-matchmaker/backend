import { Router } from 'express';

import user from './user';
import session from './session';

const router = Router();

router.use('/user', user);
router.use('/session', session);

export default router;

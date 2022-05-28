import { Router } from 'express';

import SessionController from '../controller/SessionController';

const router = Router();

router.get('/', SessionController.refresh);
router.post('/', SessionController.login);

export default router;

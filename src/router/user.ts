import { Router } from 'express';

import * as UserController from '../controller/UserController';

const router = Router();

router.get('/', UserController.getAll);

router.post('/', UserController.createUser);

router.post('/invite', UserController.sendInvite);

export default router;

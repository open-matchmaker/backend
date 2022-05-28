import { Router } from 'express';
import passport from 'passport';

import * as UserController from '../controller/UserController';

const router = Router();

router.get('/whoami', passport.authenticate('jwt', { session: false }), UserController.whoami);

router.get('/', UserController.getAll);

router.post('/', UserController.createUser);

router.post('/invite', UserController.sendInvite);

export default router;

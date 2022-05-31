import { Router } from 'express';
import passport from 'passport';

import * as UserController from '../controller/UserController';

const router = Router();

router.get('/whoami', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), UserController.whoami);

router.patch('/update', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), UserController.updateUser);

router.delete('/delete', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), UserController.deleteUser);

router.get('/', UserController.getAll);

router.post('/', UserController.createUser);

router.post('/invite', UserController.sendInvite);

export default router;

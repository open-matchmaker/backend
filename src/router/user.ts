import { Router } from 'express';
import passport from 'passport';

import * as UserController from '../controller/UserController';

const router = Router();

router.get('/whoami', passport.authenticate('jwt', { session: false }), UserController.whoami);

router.patch('/update', passport.authenticate('jwt', { session: false }), UserController.updateUser);

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), UserController.deleteUser);

router.get('/', UserController.getAll);

router.post('/', UserController.createUser);

router.post('/invite', passport.authenticate('jwt', { session: false }), UserController.sendInvite);

router.post('/acceptInvite', passport.authenticate('jwt', { session: false }), UserController.acceptInvite);

router.get('/find', UserController.findUserName);

export default router;

import { Router } from 'express';
import passport from 'passport';

import GameController from '../controller/GameController';

const router = Router();

router.get('/:game', passport.authenticate('jwt', { session: false }), (GameController.getByName));

router.get('/', passport.authenticate('jwt', { session: false }), (GameController.getAll));

router.post('/', passport.authenticate('jwt', { session: false }), (GameController.create));

router.post('/add', passport.authenticate('jwt', { session: false }), (GameController.addGameToUser));

router.post('/delete', passport.authenticate('jwt', { session: false }), (GameController.deleteGameFromUser));

export default router;

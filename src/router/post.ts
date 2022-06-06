import { Router } from 'express';
import passport from 'passport';

import PostController from '../controller/PostController';

const router = Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), PostController.getById);
router.get('/', passport.authenticate('jwt', { session: false }), PostController.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), PostController.create);

export default router;

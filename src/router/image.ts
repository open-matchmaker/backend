import { Router } from 'express';
import passport from 'passport';
import * as ImageController from '../controller/ImageController';

const router = Router();

router.get('/', ImageController.getAll);

router.post('/', passport.authenticate('jwt', { session: false }), ImageController.createImage);

router.get('/:id', ImageController.getImage);

router.patch('/:id', passport.authenticate('jwt', { session: false }), ImageController.updateImage);

router.delete('/:id', passport.authenticate('jwt', { session: false }), ImageController.deleteImage);

export default router;

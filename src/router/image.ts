import { Router } from 'express';
import passport from 'passport';
import ImageController from '../controller/ImageController';
import upload from '../middleware/aws';

const router = Router();

router.post('/delete', passport.authenticate('jwt', { session: false }), ImageController.deleteImage);

// post and updated will be the same thing
router.patch('/upload', passport.authenticate('jwt', { session: false }), upload.array('imageFile', 1), ImageController.updateImage);

export default router;

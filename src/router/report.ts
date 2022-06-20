import { Router } from 'express';
import passport from 'passport';

import ReportController from '../controller/ReportController';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (ReportController.getAll));

router.post('/:id', passport.authenticate('jwt', { session: false }), (ReportController.create));

router.patch('/:id', passport.authenticate('jwt', { session: false }), (ReportController.resolveReport));

export default router;

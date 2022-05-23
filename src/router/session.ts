import passport from 'passport';
import { Router } from 'express';
import SessionAuth from '../middleware/auth';
import SessionController from '../controller/SessionController';

const router = Router();
router.get('/', SessionController.refresh);
router.post('/', SessionController.login);

router.post('/testlogin', passport.authenticate('local', { session: false }), SessionController.loginTest);

router.get('/test', SessionAuth.authRefresh, (req,res) => {
  res.status(201).send('Authorized');
});

export default router;

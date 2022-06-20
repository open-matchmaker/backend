import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import user from './user';
import session from './session';
import post from './post';
import game from './game';
import report from './report';

import swaggerDocument from '../swagger.json';

const router = Router();

router.get('/', (_req, res) => res.send('Hello World! matchmaker-api'));
router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/user', user);
router.use('/session', session);
router.use('/post', post);
router.use('/game', game);
router.use('/report', report);
router.use('/api-docs', swaggerUi.serve);

export default router;

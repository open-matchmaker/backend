import { NextFunction, Request, Response } from 'express';
import { Users } from '@prisma/client';
import JWT from 'jsonwebtoken';
import passport from 'passport';

import { Auth } from '../schema/Session';

function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    { session: false },
    (err, user, info) => {
      if (err) return res.status(500).json({ err });

      if (!user) {
        const { message } = info;
        return res.status(401).json({ message });
      }

      const token = JWT.sign({ user }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

      return res.status(200)
        .send({ token });
    },
  )(req, res, next);
}

async function refresh(req: Request, res: Response<Auth | { message: string }>) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).send({ message: 'Invalid token' });

  const token = authorization.split(' ')[1];

  const { user } = JWT.verify(token, process.env.JWT_SECRET || '', { ignoreExpiration: true }) as { user: Users };

  const newToken = JWT.sign({ user }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

  return res.json({ token: newToken });
}

export default {
  login,
  refresh,
};

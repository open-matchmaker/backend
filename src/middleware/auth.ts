import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';

function authRefresh(req: Request, res: Response, next: Function) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(403).send({ message: 'Required token' });

  try {
    const token = authorization.split(' ')[1];

    const { user } = JWT.verify(token, process.env.JWT_SECRET || '', { ignoreExpiration: true }) as { user: Users };
    const newToken = JWT.sign(user, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    res.set('Authorization', newToken);
  } catch (error) {
    return res.status(401).send({ message: 'Invalid Token' });
  }

  return next();
}

export default {
  authRefresh,
};

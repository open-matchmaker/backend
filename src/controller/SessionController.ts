import { Request, Response } from 'express';
import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import { Login, Auth } from '../schema/Session';
import prisma from '../database';

async function login(req: Request<null, null, Login>, res: Response<Auth | { message: string }>) {
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).send({ message: 'Invalid email or password' });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return res.status(400).send({ message: 'Invalid email or password' });

  const token = JWT.sign({ user }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

  return res.json({ token });
}

async function refresh(req: Request, res: Response<Auth | { message: string }>) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).send({ message: 'Invalid token' });

  const token = authorization.split(' ')[1];

  const { user } = JWT.verify(token, process.env.JWT_SECRET || '', { ignoreExpiration: true }) as {user: Users};

  const newToken = JWT.sign(user, process.env.JWT_SECRET || '', { expiresIn: '1h' });

  return res.json({ token: newToken });
}

export default {
  login,
  refresh,
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import prisma from '../database';
import { User } from '../schema/User';

export async function getAll(req: Request, res: Response) {
  const users = await prisma.users.findMany({
    include: {
      friendUserFriends: true,
      userFriends: true,
    },
  });

  return res.json(users);
}

export async function createUser(req: Request<null, null, User>, res: Response) {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(+(process.env.SALT_ROUNDS || 10));
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.json(user);
}

export async function findUserName(req: Request, res: Response) {
  const { nameUser } = req.query.name as { nameUser: string };

  if (!nameUser) return res.status(400).send({ message: 'nameUser can not be empty' });

  const user = await prisma.users.findMany({
    where: {
      name: {
        contains: nameUser,
      },
    },
  });

  return res.json(user);
}

export async function sendInvite(req: Request, res: Response) {
  const { fromId, toId } = req.body;

  const fromUser = await prisma.users.findUnique({
    where: {
      id: fromId,
    },
  });

  const toUser = await prisma.users.findUnique({
    where: {
      id: toId,
    },
  });

  if (!fromUser || !toUser) {
    return res.status(400).send({ message: 'User not found' });
  }

  const invite = await prisma.friends.create({
    data: {
      user_id: fromId,
      friend_id: toId,
      status: false,
    },
  });

  return res.json(invite);
}

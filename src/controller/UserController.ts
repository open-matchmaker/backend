import { Request, Response } from 'express';

import prisma from '../database';

export async function getAll(req: Request, res: Response) {
  const users = await prisma.users.findMany({
    include: {
      friendUserFriends: true,
      userFriends: true,
    },
  });

  return res.json(users);
}

export async function createUser(req: Request, res: Response) {
  if (!req.body) {
    return res.status(400).send({ message: 'Contet can not be empty' });
  }

  const { name, email, password } = req.body;

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
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

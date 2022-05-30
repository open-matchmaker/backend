import { Request, Response } from 'express';

import { User } from '../schema/User';
import UserService from '../services/User.Service';

export async function whoami(req: Request, res: Response) {
  return res.json(req.user);
}

export async function getAll(req: Request, res: Response) {
  const users = await UserService.getAll();

  return res.json(users);
}

export async function createUser(req: Request<null, null, User>, res: Response) {
  const { username, email, password } = req.body;

  const user = await UserService.create({ username, email, password });

  return res.json(user);
}

export async function findUserName(req: Request, res: Response) {
  const { username } = req.query.name as { username: string };

  const users = await UserService.getByUsername(username);

  return res.json(users);
}

export async function sendInvite(req: Request, res: Response) {
  const { fromId, toId } = req.body;

  try {
    const invite = await UserService.invite(fromId, toId);

    return res.json(invite);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}

import { Request, Response } from 'express';
import * as userController from '../services/user.service';

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    await userController.getUserByEmail(email);
    const user = await userController.createUserService(name, email, password);

    res.json(user);
  } catch (erro) {
    res.send(erro);
  }
}

export async function createUsers(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    await userController.getUserByEmail(email);
    const user = await userController.createUserService(name, email, password);

    res.json(user);
  } catch (erro) {
    res.send(erro);
  }
}

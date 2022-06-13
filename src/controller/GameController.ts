import { Request, Response } from 'express';

import GameService from '../services/Game.Service';

export default {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const { user } = req;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const game = await GameService.create(user, name);
      return res.status(200).json(game);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async getAll(req: Request, res: Response) {
    const games = await GameService.getAll();

    return res.json(games);
  },

  async addGameToUser(req: Request, res: Response) {
    const { id } = req.body;
    const { user } = req;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const game = await GameService.addGameToUser(user, id);
      return res.status(200).json(game.username);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async deleteGameFromUser(req: Request, res: Response) {
    const { id } = req.body;
    const { user } = req;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const gameDeleted = await GameService.deleteGameFromPlaysGames(user, id);
      return res.status(200).json(gameDeleted.username);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async getByName(req: Request, res: Response) {
    const { game } = req.params;

    if (!game) return res.status(400).json({ message: 'Params Required' });

    try {
      const games = await GameService.getByName(game);
      return res.status(200).json(games);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

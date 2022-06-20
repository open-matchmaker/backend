import { Request, Response } from 'express';

import { Game } from '../schema/Game';

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
      const game = await GameService.followGameToUser(user, id);
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

  async getByName(req: Request<{}, {}, {}, Game>, res: Response) {
    const { query } = req;

    const { name } = query;

    try {
      const games = await GameService.getByName(name);

      if (games.length === 0) {
        return res.status(404).json({ message: 'Game not found' });
      }

      return res.status(200).json(games);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

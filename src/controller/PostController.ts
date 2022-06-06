import { Request, Response } from 'express';

import PostService from '../services/Post.Service';

export default {
  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await PostService.getById(+id);
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const posts = await PostService.getAll();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async create(req: Request, res: Response) {
    const { content, parent } = req.body;
    const { user } = req;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const post = await PostService.create(user, content, parent);
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

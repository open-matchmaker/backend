import { Request, Response } from 'express';

import ImageService from '../services/Image.Service';

export default {
  async deleteImage(req: Request, res: Response) {
    try {
      const { id } = req.user as { id: number };
      // eslint-disable-next-line max-len
      const dataUpdate = { image: '' };

      const updateImage = await ImageService.updateUser(Number(id), dataUpdate);

      return res.status(200).json(updateImage);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async updateImage(req: Request, res: Response) {
    try {
      const { id } = req.user as { id: number };
      // eslint-disable-next-line max-len
      const imageData = (req as any).files.map((file: { location: any; key: any; mimetype: any; size: any; }) => ({
        url: file.location, name: file.key, type: file.mimetype, size: file.size,
      }));
      const dataUpdate = { image: imageData[0].url };

      if ((Object.keys(dataUpdate).length === 0 && dataUpdate.constructor === Object)) return res.send('Without data to update!');

      const updateImage = await ImageService.updateUser(Number(id), dataUpdate);

      return res.status(200).json(updateImage);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

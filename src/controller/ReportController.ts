import { Report, Role } from '@prisma/client';
import { Request, Response } from 'express';

import { User } from '../schema/User';

import ReportService from '../services/Report.Service';

export default {
  async create(req: Request<{id: string}>, res: Response) {
    const { description, reportMotive } = req.body;
    const { id } = req.params;

    try {
      const reportedUser = await ReportService.create(Number(id), description, reportMotive);
      return res.status(200).json(reportedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async getAll(req: Request<null, null, User>, res: Response) {
    const { user } = req;

    if ((user?.role || Role.USER) >= Role.ADMIN) {
      try {
        const reports = await ReportService.getAll();
        return res.status(200).json(reports);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.status(401).json({ message: 'You are not authorized to do this!' });
  },

  async resolveReport(req: Request< {id: string}, null, Partial<Report>>, res: Response) {
    const { user } = req;
    const { id } = req.params;
    const { result, resolved } = req.body;

    if ((user?.role || Role.USER) >= Role.ADMIN) {
      try {
        const reports = await ReportService.resolveReport(Number(id), result, resolved);
        return res.status(200).json(reports);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.status(401).json({ message: 'You are not authorized to do this!' });
  },
};

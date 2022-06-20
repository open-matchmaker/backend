import { Prisma } from '@prisma/client';
// import { userService } from './User.Service';

import prisma from '../database';

export default {

  async getAll() {
    const reports = await prisma.report.findMany();
    return reports;
  },

  async resolveReport(id: number, result?: string, resolved?: boolean) {
    const report = await prisma.report.update({
      where: {
        id,
      },
      data: {
        result,
        resolved,
      },
    });

    return report;
  },

  async create(userId: number, description: string, reportMotive: Prisma.JsonValue) {
    const report = await prisma.report.create({
      data: {
        description,
        reportMotive: JSON.stringify(reportMotive),
        user: { connect: { id: userId } },
      },
    });

    return report;
  },
};

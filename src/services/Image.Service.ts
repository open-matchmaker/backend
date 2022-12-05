import prisma from '../database';
import { User } from '../schema/User';

export default {
  async updateUser(id: number, newDataUser: Partial<User>) {
    const userUpdate = await prisma.users.update({
      where: { id },
      data: newDataUser,
    });

    return userUpdate;
  },
};

import { Users } from '@prisma/client';

import prisma from '../database';

export default {
  async create(creator: Users, name: string) {
    const game = await prisma.games.create({
      data: {
        name,
        responsible: { connect: { id: creator.id } },
      },
    });

    return game;
  },

  async deleteGame(id: number) {
    const deletedGame = await prisma.games.delete({
      where: { id },
    });

    return deletedGame;
  },

  async deleteGameFromPlaysGames(user: Users, id: number) {
    const findGame = this.getById(id);

    if (!findGame) throw new Error('Game not found');

    const deletedGameFromUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        playsGames: {
          disconnect: { id },
        },
        updatedAt: new Date(),
      },
    });

    return deletedGameFromUser;
  },

  async getByName(gameName: string) {
    const games = await prisma.games.findMany({
      orderBy: [
        {
          name: 'desc',
        },
      ],
      where: {
        name: {
          contains: gameName,
          mode: 'insensitive',
        },
      },
    });

    return games;
  },

  async getById(id: number) {
    const game = await prisma.games.findUnique({
      where: {
        id,
      },
    });

    return game;
  },

  async followGameToUser(user: Users, id: number) {
    const findGame = this.getById(id);

    if (!findGame) throw new Error('Game not found');

    const gameAdd = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        playsGames: {
          connect: { id },
        },
        updatedAt: new Date(),
      },
    });

    return gameAdd;
  },

  async getAll() {
    const games = await prisma.games.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return games;
  },

};

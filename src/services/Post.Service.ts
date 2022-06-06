import { Posts, Users } from '@prisma/client';

import prisma from '../database';

interface RecursivePost extends Posts {
  Comments: RecursivePost[];
}

export default {
  async getById(id: number): Promise<RecursivePost | null> {
    const post = await prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        Comments: {
          include: {
            creator: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        creator: true,
      },
    });

    if (!post) return post;

    const comments = await (
      await Promise.all(
        post.Comments.map((comment) => this.getById(comment.id)),
      )).filter((comment) => comment !== null) as RecursivePost[];

    return { ...post, Comments: comments };
  },

  async getAll() {
    const posts = await prisma.posts.findMany({
      where: {
        postsId: null,
      },
      include: {
        creator: true,
        Comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts;
  },

  async create(creator: Users, content: string, parent?: number) {
    const post = await prisma.posts.create({
      data: {
        content,
        postsId: parent,
        usersId: creator.id,
      },
    });

    return post;
  },
};

import bcrypt from 'bcrypt';
import prisma from '../database';

export async function getUserByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: { email },
  });

  if (!user) throw new Error('E-mail não cadastrado');

  return user;
}

export async function createUserService(username: string, email: string, password: string) {
  const salt = await bcrypt.genSalt(+(process.env.SALT_ROUNDS || 10));
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

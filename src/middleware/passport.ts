import passport from 'passport';
import pStrategy from 'passport-local';
import bStrategy from 'passport-http-bearer'
import bcrypt from 'bcrypt';
import * as userService from '../services/user.service';
// eslint-disable-next-line import/prefer-default-export
export const LocalStrategy = pStrategy.Strategy;
export const BearerStrategy = bStrategy.Strategy;

class InvalidArgumentError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'InvalidArgumentError';
  }
}

async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) throw new InvalidArgumentError('Email ou senha invalidas');
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await userService.getUserByEmail(email);
        await verifyPassword(password, user.password);

        done(null, user);
      } catch (erro) {
        done(erro);
      }
    },
  ),
);

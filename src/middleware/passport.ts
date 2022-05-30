import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import UserService from '../services/User.Service';

async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await UserService.getByEmail(email);

      if (!user) {
        done(null, false, { message: 'Invalid email or password' });
        return;
      }

      const isValid = await verifyPassword(password, user.password);

      if (!isValid) {
        done(null, false, { message: 'Invalid email or password' });
        return;
      }

      done(null, user);
    } catch (erro) {
      done(erro);
    }
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || '',
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
  done(null, payload.user);
}));

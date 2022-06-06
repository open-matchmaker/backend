/* eslint-disable no-unused-vars */
import { Users } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends Users {}
  }
}

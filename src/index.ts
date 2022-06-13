import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';

import router from './router';
import './middleware/passport';
import HttpException from './exeptions/HttpExeption';

const app = express();
const port = process.env.PORT || 3000;

app.use((error: HttpException, req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res
    .status(status)
    .send({
      status,
      message,
    });
});

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

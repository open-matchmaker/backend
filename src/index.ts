import express from 'express';
import cors from 'cors';
import passport from 'passport';

import router from './router';
import './middleware/passport';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

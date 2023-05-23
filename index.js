import Express from 'express';
import connection from './database/connection.js';
import userRoute from './src/user/userRoutes.js';
import postRoute from './src/post/postRoutes.js';
import authRoute from './src/auth/authRoute.js';
import commentRoute from './src/comments/commentsRouter.js';
import { errorController } from './src/error/errorController.js';

import * as dotenv from 'dotenv';
dotenv.config();
const app = Express();
app.use(Express.static('public'));
app.use(Express.urlencoded({ extended: false }));
connection();

app.use(Express.json());
app.use('/comments', commentRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/', authRoute);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'page not found ,, check your url' });
});
app.use(errorController);
const port = 3000;
app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});

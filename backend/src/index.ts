import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose'
import { userRouter } from './routers/userRouter';

const server = express();

const port = 3000;

function main() {
  mongoose.connect('mongodb://mongo:27017/poliHelp-users');
  mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');
  })
  mongoose.connection.on('error', () => {
    console.log('Error connecting to mongo');
  })

  server.use(bodyParser.json());

  server.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });

  server.use('/user', userRouter);
}

main();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose'
import { userRouter } from './routers/user.router';
import { dropoffRouter } from './routers/dropoff.router';
import { requestRouter } from './routers/request.router';

const server = express();

const port = 3000;

function main() {
  mongoose.connect('mongodb://mongo:27017/poliHelp');
  mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');
  })
  mongoose.connection.on('error', () => {
    console.log('Error connecting to mongo');
  })

  server.use(bodyParser.json());

  server.use('/user', userRouter);
  server.use('/dropoff', dropoffRouter);
  server.use('/request', requestRouter);
  
  server.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });
}

main();

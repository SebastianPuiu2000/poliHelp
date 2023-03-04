import * as express from 'express';

export const userRouter = express.Router();

userRouter.post('/') // success

userRouter.post('/auth') // JWT-ul
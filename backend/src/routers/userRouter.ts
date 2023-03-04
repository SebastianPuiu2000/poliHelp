import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { sign } from '../jwt';
import { User, UserModel, createUser } from '../models/user.model';

export const userRouter = express.Router();

// Register
userRouter.post('/', async (req, res) => {
    let user: User = req.body;
    if (!user || !user.name || !user.username || !user.password || !user.role) {
        return res
            .status(400)
            .json({success: false, message: 'Bad request'});
    }

    let status: string = await createUser(user);

    if (status !== 'OK') {
        return res
            .status(400)
            .json({success: false, message: status});
    }

    return res
        .status(200)
        .json({success: true, message: status});
});

// Sign-in
userRouter.post('/auth', async (req, res) => {
    let body: {username: string, password: string} = req.body;
    if (!body || ! body.username || !body.password) {
        return res
            .status(400)
            .json({success: false, jwt: ''});
    }

    const mongoUser = await UserModel.findOne({username: body.username});

    if (!mongoUser) {
        return res
            .status(404)
            .json({success: false, jwt: ''});
    }

    const passwordCorrect = await bcrypt.compare(body.password, mongoUser.password);
    if (passwordCorrect) {
      const token = sign(mongoUser._id, mongoUser.role);

      return res.json({success: true, jwt: token});
    }

    return res.json({success: false, jwt: ''});
});

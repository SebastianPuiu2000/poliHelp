import * as express from 'express';
import { getToken, verify } from '../jwt';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { Dropoff, DropoffModel } from '../models/dropoff.model';

export const dropoffRouter = express.Router();

// Get dropoff points around a given location
dropoffRouter.get('/', async (req, res) => {
    let token: string = getToken(req.url);
    
    if (token === '') {
        return res
            .status(400)
            .json({success: false, dropoffs: []});
    }
    
    if (!req.query.lat || !req.query.lgn) {
        return res
        .status(400)
        .json({success: false, dropoffs: []});
    }
    let requestLat = Number(req.query.lat);
    let requestLgn = Number(req.query.lgn);

    let payload: JwtPayload = verify(token);

    if (!payload) {
        return res
            .status(400)
            .json({success: false, dropoffs: []});
    }

    let mongoUser = await UserModel.findById(payload.id);

    let nearbyDropoffs = await DropoffModel.find({
        $and: [
            {lat: {$gte: requestLat - 1, $lte: requestLat + 1}},
            {lgn: {$gte: requestLgn - 1, $lte: requestLgn + 1}}
        ]
    });

    return res.json({success: true, dropoffs: nearbyDropoffs});
});

dropoffRouter.post('/', async (req, res) => {
    let token: string = getToken(req.url);
    
    if (token === '') {
        return res
            .status(400)
            .json({success: false});
    }

    let dropoff: Dropoff = req.body;
    if (!dropoff || !dropoff.lat || !dropoff.lgn) {
        return res
            .status(400)
            .json({success: false});
    }

    let payload: JwtPayload = verify(token);

    if (!payload) {
        return res
            .status(400)
            .json({success: false});
    }

    await DropoffModel.create({
        userId: payload.id,
        lat: dropoff.lat,
        lgn: dropoff.lgn
    });

    return res.json({success: true});
});
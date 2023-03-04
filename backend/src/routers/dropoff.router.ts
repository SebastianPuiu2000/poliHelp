import * as express from 'express';
import { getToken, verify } from '../jwt';
import { JwtPayload } from 'jsonwebtoken';
import { userRole } from '../models/user.model';
import { Supply, Dropoff, DropoffModel } from '../models/dropoff.model';

export const dropoffRouter = express.Router();

// Get dropoff points around a given location
dropoffRouter.get('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false, dropoffs: []});
    }
    
    let payload: JwtPayload = verify(token);
    if (payload.role !== userRole.Delivery) {
        return res.status(401).json({success: false, dropoffs: []});
    }
    if (!payload || !req.query.lat || !req.query.lgn) {
        return res.status(400).json({success: false, dropoffs: []});
    }

    let requestLat = Number(req.query.lat);
    let requestLgn = Number(req.query.lgn);

    let nearbyDropoffs = await DropoffModel.find({
        $and: [
            {lat: {$gte: requestLat - 1, $lte: requestLat + 1}},
            {lgn: {$gte: requestLgn - 1, $lte: requestLgn + 1}}
        ]
    });

    return res.json({success: true, dropoffs: nearbyDropoffs});
});

// Add dropoff
dropoffRouter.post('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false});
    }

    let payload: JwtPayload = verify(token);
    if (!payload) {
        return res.status(400).json({success: false});
    }
    if (payload.role !== userRole.Delivery) {
        return res.status(401).json({success: false});
    }

    let dropoff: Dropoff = req.body;
    if (!dropoff || !dropoff.lat || !dropoff.lgn) {
        return res.status(400).json({success: false});
    }

    await DropoffModel.create({
        userId: payload.id,
        lat: dropoff.lat,
        lgn: dropoff.lgn
    });

    return res.json({success: true});
});

// Add supplies to dropoff
dropoffRouter.put('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false});
    }

    let payload: JwtPayload = verify(token);
    if (!payload) {
        return res.status(400).json({success: false});
    }

    let body: {id: any, supplies: Supply[]} = req.body;
    if (!body || !body.id || !body.supplies) {
        return res.status(400).json({success: false});
    }

    await DropoffModel.findByIdAndUpdate(body.id, {
        supplies: body.supplies
    });

    return res.json({success: true});
});

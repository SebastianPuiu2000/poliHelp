import * as express from 'express';
import { getToken, verify } from '../jwt';
import { JwtPayload } from 'jsonwebtoken';
import { userRole } from '../models/user.model';
import { Supply, Dropoff, DropoffModel } from '../models/dropoff.model';
import { RequestModel } from '../models/requests.model';

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
    if (!payload || !req.query.lat || !req.query.lng) {
        return res.status(400).json({success: false, dropoffs: []});
    }

    let requestLat = Number(req.query.lat);
    let requestLng = Number(req.query.lng);

    let nearbyDropoffs = await DropoffModel.find({
        $and: [
            {lat: {$gte: requestLat - 1, $lte: requestLat + 1}},
            {lng: {$gte: requestLng - 1, $lte: requestLng + 1}}
        ]
    });

    // Get matching requests for each nearby dropoff
    let response = await Promise.all(nearbyDropoffs.map(async nearbyDropoff => {
        let associatedRequests = await RequestModel.find({
            dropoffId: nearbyDropoff._id
        });
        return {
            dropoff: nearbyDropoff,
            requests: associatedRequests
        };
    }));

    return res.json({success: true, dropoffs: response});
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
    if (!dropoff || !dropoff.lat || !dropoff.lng) {
        return res.status(400).json({success: false});
    }

    await DropoffModel.create({
        userId: payload.id,
        lat: dropoff.lat,
        lng: dropoff.lng
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

    let updatedDropoff = await DropoffModel.findByIdAndUpdate(body.id, {
        supplies: body.supplies
    });
    if (!updatedDropoff) {
        return res.status(400).json({success: false});
    }

    return res.json({success: true});
});

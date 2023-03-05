import * as express from 'express';
import { getToken, verify } from '../jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Request, RequestModel } from '../models/requests.model';
import { isDesiredRole, isTokenValid } from '../utils';
import { userRole } from '../models/user.model';

export const requestRouter = express.Router();

// Get by request id
requestRouter.get('/', async (req, res) => {
    let requestId = req.query.id;

    let request = await RequestModel.findById(requestId);
    if (!request) {
        return res.status(400).json({success: false});
    }

    return res.json({success: true, request});
});

// Get by user id
requestRouter.get('/user', async (req, res) => {
    let userId = req.query.id;
    if (!isTokenValid(req) || !userId) {
        return res.status(400).json({success: false, dropoffs: []});
    }

    let requests = await RequestModel.find({userId});
    return res.json({success: true, requests});
});

// Get by dropoff id
requestRouter.get('/dropoff', async (req, res) => {
    let dropoffId = req.query.id;
    if (!isTokenValid(req) || !dropoffId) {
        return res.status(400).json({success: false, dropoffs: []});
    }

    let requests = await RequestModel.find({dropoffId});
    return res.json({success: true, requests});
});

// Create request
requestRouter.post('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false});
    }
    
    let request: Request = req.body;
    let payload: JwtPayload = verify(token);
    if (!payload || !request || !request.dropoffId || !request.lat || !request.lng) {
        return res.status(400).json({success: false});
    }
    if (!isDesiredRole(payload, userRole.SuppliesConsumer)) {
        return res.status(401).json({success: false});
    }

    let createdRequest = await RequestModel.create({
        dropoffId: request.dropoffId,
        userId: payload.id,
        supplies: request.supplies,
        lat: request.lat,
        lng: request.lng
    });
    if(!createdRequest) {
        return res.json({success: false});
    }

    return res.json({success: true});
});

// Update request
requestRouter.put('/', async (req, res) => {
    let request: Request = req.body;
    let requestId = req.query.id;

    let token = getToken(req.headers.authorization);
    if (!token || !requestId) {
        return res.status(400).json({success: false});
    }

    let payload: JwtPayload = verify(token);
    if (!isDesiredRole(payload, userRole.SuppliesConsumer)) {
        return res.status(401).json({success: false});
    }

    let updatedRequest = await RequestModel.findByIdAndUpdate(requestId, request);
    if(!updatedRequest) {
        return res.json({success: false});
    }

    return res.json({success: true});
});

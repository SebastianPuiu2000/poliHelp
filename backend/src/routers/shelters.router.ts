import * as express from 'express';
import { getToken, verify } from '../jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Shelter, ShelterModel } from '../models/shelter.model';
import { UserModel, userRole } from '../models/user.model';
import { isDesiredRole } from '../utils';

export const shelterRouter = express.Router();

// Get all shelters that still have empty places
shelterRouter.get('/', async (_, res) => {
    let availableShelters = await ShelterModel.find({
        $where: 'return (this.quantity - this.userIds.length) > 0;'
    });
    return res.json({success: true, availableShelters});
});

// Create new shelter
shelterRouter.post('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false});
    }
    
    let shelter: Shelter = req.body;
    let payload: JwtPayload = verify(token);
    if (!payload || !shelter || !shelter.quantity || !shelter.lat || !shelter.lng) {
        return res.status(400).json({success: false});
    }
    if (!isDesiredRole(payload, userRole.ShelterProvider)) {
        return res.status(401).json({success: false});
    }

    let createdShleter = await ShelterModel.create({
        quantity: shelter.quantity,
        userId: payload.id,
        lat: shelter.lat,
        lng: shelter.lng
    });
    if(!createdShleter) {
        return res.json({success: false});
    }

    return res.json({success: true});
});

// Adds the current user to the specified shelter
shelterRouter.put('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false});
    }

    let payload: JwtPayload = verify(token);
    let shelterId = String(req.query.id); // id of shelter I want to be added to
    if (!payload || !shelterId) {
        return res.status(400).json({success: false});
    }
    if (!isDesiredRole(payload, userRole.ShelterConsumer)) {
        return res.status(401).json({success: false});
    }

    let mongoUser = await UserModel.findById(payload.id);
    if (!mongoUser) {
        return res.status(400).json({success: false});
    }
    if (mongoUser.shelterId) {
        return res.status(406).json({success: false, message: 'User already in shelter'});
    }

    await ShelterModel.findByIdAndUpdate(shelterId, {
        $addToSet: {userIds: payload.id}
    });
    mongoUser.shelterId = shelterId;
    await mongoUser.save();

    return res.json({success: true});
});

// Remove the current user from his shelter
shelterRouter.delete('/', async (req, res) => {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return res.status(400).json({success: false});
    }

    let payload: JwtPayload = verify(token);
    if (!payload) {
        return res.status(400).json({success: false});
    }
    if (!isDesiredRole(payload, userRole.ShelterConsumer)) {
        return res.status(401).json({success: false});
    }

    let mongoUser = await UserModel.findById(payload.id);
    if (!mongoUser || !mongoUser.shelterId) {
        return res.status(400).json({success: false, message: 'User isn\'t in any shelter!'});
    }
    let mongoShelter = await ShelterModel.findById(mongoUser.shelterId);
    if (!mongoShelter) {
        return res.status(400).json({success: false});
    }
    mongoUser.shelterId = undefined;
    let index = mongoShelter.userIds.indexOf(payload.id);
    if (index >= 0) {
        mongoShelter.userIds.splice(index, 1);
    }
    await mongoUser.save();
    await mongoShelter.save();

    return res.json({success: true});
});

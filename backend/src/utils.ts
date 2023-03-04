import * as express from 'express';
import { getToken, verify } from './jwt';
import { JwtPayload } from 'jsonwebtoken';
import { userRole } from './models/user.model';

export function isTokenValid(req: express.Request): boolean {
    let token = getToken(req.headers.authorization);
    if (!token) {
        return false;
    }
    
    let payload: JwtPayload = verify(token);
    if (!payload) {
        return false;
    }

    return true;
}

// Checks if the payload contains the desired role
export function isDesiredRole(payload: JwtPayload, desiredRole: userRole): boolean {
    return payload.role === desiredRole;
}

import * as jwt from 'jsonwebtoken';
import { parse } from 'url';

const jwtSecret: string = process.env.JWT_SECRET || '123456';
const tokenExpirationInSeconds = 36000;

export function getToken(url: string | undefined): string | null {
    const token = parse(url || '', true).query.token;

    if (!token) {
        return null;
    }

    return token.toString();
};

export function sign(id: any, role: string) {
    return jwt.sign({id: id, role: role}, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
    });
};

export function verify(token: string) {
    let payload = jwt.verify(token, jwtSecret);

    if (typeof payload === 'string') {
        throw new Error();
    }

    return payload;
};

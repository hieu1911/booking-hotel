import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { createError } from '../utils/createError';

interface UserRequest extends Request {
    user: any;
}

export const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, 'You are no authenticated!'));
    }

    jwt.verify(token, process.env.JWT, (err: Error, user: any) => {
        if (err) {
            return next(createError(403, 'Token is invalid!'));
        }
        req.user = user;
        next();
    })
}

export const verifyUser = (req: UserRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id) {
            next();
        } else {
            return next(createError(403, 'You are not authorized!'));
        }
    })
}

export const verifyAdmin = (req: UserRequest, res: Response, next: NextFunction) => {
    verifyUser(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, 'You are not an administrator!'));
        }
    })
}
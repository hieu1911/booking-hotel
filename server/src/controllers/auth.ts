import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { createError } from '../utils/createError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phoneNumber: req.body.phoneNumber || '',
            isAdmin: req.body.isAdmin || false,
        })

        await newUser.save();
        const {username, email, phoneNumber} = newUser;
        res.status(200).json({username, email, phoneNumber});
    } catch (err) {
        next(err);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(createError(404, 'Invalid email or password!'));
        }

        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isPassword) {
            return next(createError(400, 'Invalid password!'));
        }

        const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin }, process.env.JWT);
        
        return res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
    } catch (err) {
        next(err);
    }
}

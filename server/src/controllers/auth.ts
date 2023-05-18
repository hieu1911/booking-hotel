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
            password: hash
        })

        await newUser.save();
        res.status(200).send('User has been registered!');
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

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        
        return res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
    } catch (err) {
        next(err);
    }
}

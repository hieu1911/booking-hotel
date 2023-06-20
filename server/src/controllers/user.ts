import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const getUserByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find({username: req.query.name});
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const getNumberOfUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json(count);
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!');
    } catch (err) {
        next(err);
    }
}
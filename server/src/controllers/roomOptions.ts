import { Request, Response, NextFunction } from 'express';

import RoomOptions from '../models/RoomOptions';

export const getRoomOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomOptions = await RoomOptions.findById(req.params.id);
        res.status(200).json(roomOptions);
    } catch (err) {
        next(err);
    }
}

export const getAllRoomOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomOptions = await RoomOptions.find();
        res.status(200).json(roomOptions);
    } catch (err) {
        next(err);
    }
}

export const createRoomOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoomOptions = new RoomOptions(req.body);
        const saveNewRoomOptions = await newRoomOptions.save()
        res.status(200).json(saveNewRoomOptions);
    } catch (err) {
        next(err);
    }
}

export const updateRoomOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateRoomOptions = await RoomOptions.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateRoomOptions);
    } catch (err) {
        next(err);
    }
}
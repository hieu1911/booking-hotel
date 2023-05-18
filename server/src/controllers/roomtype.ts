import { Request, Response, NextFunction } from 'express';

import RoomType from '../models/RoomType';

export const getRoomType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomType = await RoomType.findById(req.params.id);
        res.status(200).json(roomType);
    } catch (err) {
        next(err);
    }
}

export const getAllRoomTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomTypes = await RoomType.find();
        res.status(200).json(roomTypes);
    } catch (err) {
        next(err);
    }
}

export const createRoomType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoomType = new RoomType(req.body);
        const saveNewRoomType = await newRoomType.save()
        res.status(200).json(saveNewRoomType);
    } catch (err) {
        next(err);
    }
}

export const updateRoomType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateRoomType = await RoomType.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateRoomType);
    } catch (err) {
        next(err);
    }
}
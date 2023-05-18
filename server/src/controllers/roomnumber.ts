import { Request, Response, NextFunction } from 'express';

import RoomNumber from '../models/RoomNumber';

export const getRoomNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomNumber = await RoomNumber.findById(req.params.id);
        res.status(200).json(roomNumber);
    } catch (err) {
        next(err);
    }
}

export const getAllRoomNumbers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomNumbers = await RoomNumber.find();
        res.status(200).json(roomNumbers);
    } catch (err) {
        next(err);
    }
}

export const createRoomNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoomNumber = new RoomNumber(req.body);
        const saveRoomNumber = await newRoomNumber.save();
        res.status(200).json(saveRoomNumber);
    } catch (err) {
        next(err);
    }
}

export const updateRoomNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateRoomNumber = await RoomNumber.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateRoomNumber);
    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailabilityDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await RoomNumber.updateOne(
            {"_id": req.params.id},
            {
                $push: {
                    "unAvailableDates": req.body.dates
                }
            }
        )
    } catch (err) {
        next(err);
    }
}

export const deleteRoomNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await RoomNumber.findByIdAndDelete(req.params.id);
        res.status(200).json('RoomNumber has been deleted!');
    } catch (err) {
        next(err);
    }
}
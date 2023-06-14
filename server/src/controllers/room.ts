import { Request, Response, NextFunction } from 'express';

import Room from '../models/Room';

export const getRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}

export const getRoomsByHotelID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await Room.find({ hotelID: req.params.hotelID });
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}

export const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}

export const getCountRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await Room.countDocuments();
        res.status(200).json(count);
    } catch (err) {
        next(err);
    }
}

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoom = new Room(req.body);
        const saveRoom = await newRoom.save();
        res.status(200).json(saveRoom);
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateRoom);
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json('Room has been deleted!');
    } catch (err) {
        next(err);
    }
}
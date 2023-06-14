import { Request, Response, NextFunction } from 'express';

import Reservation from '../models/Reservation';

export const getReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.status(200).json(reservation);
    } catch (err) {
        next(err);
    }
}

export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
}

export const getAllReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find({ userID: req.params.id });
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
}

export const getCountReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await Reservation.countDocuments();
        res.status(200).json(count);
    } catch (err) {
        next(err);
    }
}


export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newReservation = new Reservation(req.body);
        const saveReservation = await newReservation.save();
        res.status(200).json(saveReservation);
    } catch (err) {
        next(err);
    }
}

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateReservation);
    } catch (err) {
        next(err);
    }
}

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json('Reservation has been deleted!');
    } catch (err) {
        next(err);
    }
}
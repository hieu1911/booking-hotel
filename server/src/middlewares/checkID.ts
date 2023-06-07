import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Country from '../models/Country';
import City from '../models/City';
import Hotel from '../models/Hotel';
import Room from '../models/Room';
import RoomType from '../models/RoomType';
import RoomOptions from '../models/RoomOptions';
import User from '../models/User';
import { createError } from '../utils/createError';

export const checkCountryID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countryID = req.body.countryID;
        const country = await Country.findById(countryID);
        if (!country) {
            next(createError(404, 'Country does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

export const checkCityID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cityID = req.body.cityID;
        const city = await City.findById(cityID);
        if (!city) {
            next(createError(404, 'City does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

export const checkHotelID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelID = req.body.hotelID;
        const hotel = await Hotel.findById(hotelID);
        if (!hotel) {
            next(createError(404, 'Hotel does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

export const checkRoomID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomID = req.body.roomID;
        const room = await Room.findById(roomID);
        if (!room) {
            next(createError(404, 'Room does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}


export const checkRoomTypeID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomTypeID = new mongoose.Types.ObjectId(req.body.roomTypeID);
        const roomType = await RoomType.findById(roomTypeID);
        if (!roomType) {
            next(createError(404, 'Room Type does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

export const checkRoomOptionID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomOptionID = new mongoose.Types.ObjectId(req.body.roomOptionID);
        const roomOption = await RoomOptions.findById(roomOptionID);
        if (!roomOption) {
            next(createError(404, 'Room Option does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

export const checkUserID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.body.userID;
        const user = await User.findById(userID);
        if (!user) {
            next(createError(404, 'User does not exist!'));
        }
        next();
    } catch (err) {
        next(err);
    }
}
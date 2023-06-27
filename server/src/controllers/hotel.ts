import { Request, Response, NextFunction } from 'express';

import Hotel from '../models/Hotel';
import Room from '../models/Room';

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getHotelByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await Hotel.findOne({ name: req.query.name });
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getCountHotels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await Hotel.countDocuments();
        res.status(200).json(count);
    } catch (err) {
        next(err);
    }
}

export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
    const { min, max, limit, ...others } = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 99999999999}
        }).limit(Number(limit) || 9999);
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
}

export const getHotelsByCityID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotels = await Hotel.find({ cityID: req.params.cityID})
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
}

export const getHotelsByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotels = await Hotel.find({ type: req.query.type })
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
}

export const getAllHotelsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotels = await Hotel.find({name: req.query.name});
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const getCountByCity = async (req: Request, res: Response, next: NextFunction) => {
    const cities = req.query.cities.toString().split(',');
    try {
        const list = await Promise.all(
            cities.map(city => {
                return Hotel.countDocuments({ city: city });
            })
        )
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const getCountByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
        const resortCount = await Hotel.countDocuments({ type: 'resort' });
        const villaCount = await Hotel.countDocuments({ type: 'villa' });
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

        res.status(200).json([
            {type: 'hotel', count: hotelCount},
            {type: 'apartment', count: apartmentCount},
            {type: 'resort', count: resortCount},
            {type: 'villa', count: villaCount},
            {type: 'cabin', count: cabinCount},
        ])
    } catch (err) {
        next(err);
    }
}

export const getHotelRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await Room.find({ hotelID: req.params.id });
        res.status(200).json(rooms)
    } catch (err) {
        next(err);
    }
}


export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json('Hotel been deleted!');
    } catch (err) {
        next(err);
    }
}
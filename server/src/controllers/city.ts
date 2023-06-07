import { Request, Response, NextFunction } from 'express';

import City from '../models/City';

export const getCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await City.findById(req.params.id);
        res.status(200).json(city);
    } catch (err) {
        next(err);
    }
}

export const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cities = await City.find({ userID: req.params.uid });
        res.status(200).json(cities);
    } catch (err) {
        next(err);
    }
}

export const getCityByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await City.findOne({ name: req.query.name });
        res.status(200).json(city);
    } catch (err) {
        next(err);
    }
}

export const createCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCity = new City(req.body);
        const saveCity = await newCity.save();
        res.status(200).json(saveCity);
    } catch (err) {
        next(err);
    }
}

export const updateCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateCity = await City.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateCity);
    } catch (err) {
        next(err);
    }
}

export const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await City.findByIdAndDelete(req.params.id);
        res.status(200).json('City has been deleted!');
    } catch (err) {
        next(err);
    }
}
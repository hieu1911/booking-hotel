import { Request, Response, NextFunction } from 'express';

import Country from '../models/Country';

export const getCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await Country.findById(req.params.id);
        res.status(200).json(country);
    } catch (err) {
        next(err);
    }
}

export const getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countries = await Country.find({ userID: req.params.uid });
        res.status(200).json(countries);
    } catch (err) {
        next(err);
    }
}

export const createCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCountry = new Country(req.body);
        const saveCountry = await newCountry.save();
        res.status(200).json(saveCountry);
    } catch (err) {
        next(err);
    }
}

export const updateCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateCountry = await Country.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateCountry);
    } catch (err) {
        next(err);
    }
}

export const deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Country.findByIdAndDelete(req.params.id);
        res.status(200).json('Country has been deleted!');
    } catch (err) {
        next(err);
    }
}
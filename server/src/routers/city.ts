import express from 'express';

import { verifyAdmin } from '../middlewares/verifyToken';
import {
    getCity,
    getAllCities,
    createCity,
    updateCity,
    deleteCity
} from '../controllers/city'
import { checkCountryID } from '../middlewares/checkID'

const router = express.Router();

// get
router.get('/:id', getCity);
// get all
router.get('/', getAllCities);
// create
router.post('/', verifyAdmin, checkCountryID, createCity);
// update
router.put('/:id', updateCity);
// delete
router.delete('/:id', deleteCity);

export default router;
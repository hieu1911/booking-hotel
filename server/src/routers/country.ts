import express from 'express';

import { verifyAdmin } from '../middlewares/verifyToken';
import {
    getCountry,
    getAllCountries,
    createCountry,
    updateCountry,
    deleteCountry
} from '../controllers/country'

const router = express.Router();

// get
router.get('/:id', getCountry);
// get all
router.get('/', getAllCountries);
// create
router.post('/', verifyAdmin, createCountry);
// update
router.put('/:id', updateCountry);
// delete
router.delete('/:id', deleteCountry);

export default router;
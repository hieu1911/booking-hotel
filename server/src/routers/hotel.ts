import express from 'express';
import {
    getHotel,
    getAllHotels,
    getCountByCity,
    getCountByType,
    getHotelRooms,
    createHotel,
    updateHotel,
    deleteHotel,
} from '../controllers/hotel';

import { verifyAdmin } from '../middlewares/verifyToken';
import { checkCityID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/:id', getHotel);
// get all
router.get('/', getAllHotels);
router.get('/countByCity', getCountByCity);
router.get('/countByType', getCountByType);
router.get('/hotel-rooms/:id', getHotelRooms)
// create
router.post('/', createHotel);
// update
router.put('/:id', verifyAdmin, checkCityID, updateHotel);
// delete
router.delete('/:id', deleteHotel);

export default router;

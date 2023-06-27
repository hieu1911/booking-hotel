import express from 'express';
import {
    getHotel,
    getHotelByName,
    getAllHotels,
    getCountHotels,
    getCountByCity,
    getCountByType,
    getHotelRooms,
    getHotelsByCityID,
    getHotelsByType,
    getAllHotelsByName,
    createHotel,
    updateHotel,
    deleteHotel,
} from '../controllers/hotel';

import { verifyAdmin } from '../middlewares/verifyToken';
import { checkCityID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/id/:id', getHotel);
router.get('/name', getHotelByName);
// get all
router.get('/', getAllHotels);
router.get('/count', getCountHotels);
router.get('/countByCity', getCountByCity);
router.get('/countByType', getCountByType);
router.get('/hotel-rooms/:id', getHotelRooms);
router.get('/hotelsInCity/:cityID', getHotelsByCityID);
router.get('/hotelsType', getHotelsByType);
router.get('/getByName', getAllHotelsByName);
// create
router.post('/', createHotel);
// update
router.put('/update/:id', checkCityID, updateHotel);
// delete
router.delete('/delete/:id', deleteHotel);

export default router;

import express from 'express';

import {
    getRoom,
    getRoomsByHotelID,
    getAllRooms,
    getCountRooms,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../controllers/room';
import { checkHotelID, checkRoomTypeID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/id/:id', getRoom);
//get rooms by hotel id
router.get('/roomInHotel/:hotelID', getRoomsByHotelID);
// get all
router.get('/', getAllRooms);
router.get('/count', getCountRooms);
// create
router.post('/', checkHotelID, checkRoomTypeID, createRoom);
// update
router.put('/:id', updateRoom);
// delete
router.delete('/:id', deleteRoom);

export default router;

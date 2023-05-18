import express from 'express';

import {
    getRoom,
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../controllers/room';
import { checkHotelID, checkRoomTypeID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/:id', getRoom);
// get all
router.get('/', getAllRooms);
// create
router.post('/', checkHotelID, checkRoomTypeID, createRoom);
// update
router.put('/:id', updateRoom);
// delete
router.delete('/:id', deleteRoom);

export default router;

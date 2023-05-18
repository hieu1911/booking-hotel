import express from 'express';

import {
    getRoomNumber,
    getAllRoomNumbers,
    createRoomNumber,
    updateRoomNumber,
    updateRoomAvailabilityDates,
    deleteRoomNumber
} from '../controllers/roomnumber';
import { checkRoomID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/:id', getRoomNumber);
// get all 
router.get('/', getAllRoomNumbers);
// create
router.post('/', checkRoomID, createRoomNumber);
// update
router.put('/:id', updateRoomNumber);
router.put('/:id', updateRoomAvailabilityDates);
// delete
router.delete('/:id', deleteRoomNumber);

export default router;
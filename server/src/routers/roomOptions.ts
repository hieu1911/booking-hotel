import express from 'express';

import {
    getRoomOptions,
    getRoomOptionsByRoomID,
    getAllRoomOptions,
    createRoomOptions,
    updateRoomOptions,
    updateRoomAvailability
} from '../controllers/roomOptions';
import { checkRoomID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/id/:id', getRoomOptions);
// get by room id
router.get('/room/:roomID', getRoomOptionsByRoomID);
// get all
router.get('/', getAllRoomOptions);
// create
router.post('/', checkRoomID, createRoomOptions);
// update
router.put('/:id', updateRoomOptions);
// update avaibility 
router.put('/avaibility/:id', updateRoomAvailability)

export default router;
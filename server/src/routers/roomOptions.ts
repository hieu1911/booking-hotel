import express from 'express';

import {
    getRoomOptions,
    getRoomOptionsByRoomID,
    getAllRoomOptions,
    createRoomOptions,
    updateRoomOptions,
    updateRoomAvailability,
    deleteRoomOptions
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
router.put('/update/:id', updateRoomOptions);
// update avaibility 
router.put('/avaibility/:id', updateRoomAvailability);
// delete
router.delete('/delete/:id', deleteRoomOptions);

export default router;
import express from 'express';

import {
    getRoomOptions,
    getAllRoomOptions,
    createRoomOptions,
    updateRoomOptions,
} from '../controllers/roomOptions';
import { checkRoomID } from '../middlewares/checkID';

const router = express.Router();

// get
router.get('/:id', getRoomOptions);
// get all
router.get('/', getAllRoomOptions);
// create
router.post('/', checkRoomID, createRoomOptions);
// update
router.put('/:id', updateRoomOptions);

export default router;
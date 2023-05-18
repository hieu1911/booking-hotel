import express from 'express';

import {
    getRoomType,
    getAllRoomTypes,
    createRoomType,
    updateRoomType,
} from '../controllers/roomtype'

const router = express.Router();

// get
router.get('/:id', getRoomType);
// get all
router.get('/', getAllRoomTypes);
// create
router.post('/', createRoomType);
// update
router.put('/:id', updateRoomType);
// room type cannot be delete

export default router;
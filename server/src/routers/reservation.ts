import express from 'express';

import {
    getReservation,
    getReservations,
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation
} from '../controllers/reservation'
import { checkUserID, checkRoomOptionID } from '../middlewares/checkID'

const router = express.Router();

// get
router.get('/:id', getReservation);
// get all
router.get('/', getReservations);
// get all by user id
router.get('/user/:id', getAllReservations);
// create
// /:id is /:uid
router.post('/', checkUserID, checkRoomOptionID, createReservation);
// update
router.put('/:id', updateReservation);
// delete
router.delete('/:id', deleteReservation);

export default router;
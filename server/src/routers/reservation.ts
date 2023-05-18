import express from 'express';

import { verifyUser } from '../middlewares/verifyToken';
import {
    getReservation,
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation
} from '../controllers/reservation'
import { checkUserID, checkRoomID } from '../middlewares/checkID'

const router = express.Router();

// get
router.get('/:id', getReservation);
// get all
router.get('/user/:uid', getAllReservations);
// create
// /:id is /:uid
router.post('/:id', verifyUser, checkUserID, checkRoomID, createReservation);
// update
router.put('/:id', updateReservation);
// delete
router.delete('/:id', deleteReservation);

export default router;
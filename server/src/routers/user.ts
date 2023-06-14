import express from 'express';
import { verifyUser } from '../middlewares/verifyToken';
import { getUser, getAllUsers, getNumberOfUsers, updateUser, deleteUser } from '../controllers/user';

const router = express.Router();

// get
router.get('/id/:id', verifyUser, getUser);
// get all
router.get('/', getAllUsers);
router.get('/numUsers', getNumberOfUsers);
// update
router.put('/:id', verifyUser, updateUser);
// delete
router.delete('/:id', verifyUser, deleteUser);

export default router;
import express from 'express';
import { verifyUser } from '../middlewares/verifyToken';
import { getUser, getAllUsers, updateUser, deleteUser } from '../controllers/user';

const router = express.Router();

// get
router.get('/:id', verifyUser, getUser);
// get all
router.get('/', getAllUsers);
// update
router.put('/:id', verifyUser, updateUser);
// delete
router.delete('/:id', verifyUser, deleteUser);

export default router;
import express from 'express';
import { verifyUser } from '../middlewares/verifyToken';
import { getUser, getAllUsers, getNumberOfUsers, getUserByName, updateUser, deleteUser } from '../controllers/user';

const router = express.Router();

// get
router.get('/id/:id', verifyUser, getUser);
// get all
router.get('/', getAllUsers);
router.get('/numUsers', getNumberOfUsers);
router.get('/getByName', getUserByName);
// update
router.put('/update/:id', updateUser);
// delete
router.delete('/delete/:id', deleteUser);

export default router;
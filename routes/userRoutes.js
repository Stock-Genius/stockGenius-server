import express from 'express';
import userController from '../controllers/userController.js';
import { admin, protect } from "../middlewares/authMiddleware.js";

const { register, login, getUsers, updateUserProfile, getUserProfile } = userController;

const router = express.Router();
router.route('/').post(register).get(protect, admin, getUsers);
router.route('/login').post(login);
router.route('/profile').put(protect, updateUserProfile).get(protect, getUserProfile);



export default router;
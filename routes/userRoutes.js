import express from 'express';
import userController from '../controllers/userController.js';

const { register, login } = userController;

const router = express.Router();
router.route('/').post(register);
router.route('/login').post(login);


export default router;
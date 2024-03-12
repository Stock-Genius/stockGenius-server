import express from 'express';
import { uploadUserProfileImage, uploadProductImage } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/products', uploadProductImage);
router.post('/users', uploadUserProfileImage);

export default router;
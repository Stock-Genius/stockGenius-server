import express from 'express';
import itemController from '../controllers/itemController.js';
import { protect } from '../middlewares/authMiddleware.js';

const { addItem, getItems, deleteItem, updateItem, sellItem, getSellItems, deleteSellItem } = itemController;
const router = express.Router();

router.route('/').get(protect, getItems).post(protect, addItem);
router.route('/:id').delete(protect, deleteItem).put(protect, updateItem);
router.get('/sell', protect, getSellItems);
router.route('/sell/:id').put(protect, sellItem).delete(protect, deleteSellItem);

export default router;
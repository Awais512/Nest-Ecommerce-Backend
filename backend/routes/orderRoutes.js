import express from 'express';
import {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getAdminAllOrders,
  updateAdminOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/auth.js';
const router = express.Router();

router.route('/').post(protect, createOrder);

router.route('/:id').get(protect, getSingleOrder);

router.route('/order/me').get(protect, getAllOrders);

router.route('/admin/orders').get(protect, admin('admin'), getAdminAllOrders);

router
  .route('/admin/order/:id')
  .put(protect, admin('admin'), updateAdminOrder)
  .delete(protect, admin('admin'), deleteOrder);

export default router;

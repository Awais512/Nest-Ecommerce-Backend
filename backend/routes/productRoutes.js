import express from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import { admin, protect } from '../middlewares/auth.js';
const router = express.Router();

router.route('/').post(protect, admin('admin'), createProduct).get(getProducts);
router
  .route('/:id')
  .get(getProduct)
  .put(protect, admin('admin'), updateProduct)
  .delete(protect, admin('admin'), deleteProduct);
router.post('/reviews', protect, createProductReview);

export default router;

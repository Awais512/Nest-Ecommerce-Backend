import express from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
const router = express.Router();

router.route('/').post(createProduct).get(getProducts);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;

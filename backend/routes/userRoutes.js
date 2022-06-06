import express from 'express';
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  userDetails,
} from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/password/update', protect, updatePassword);
router.get('/me', protect, userDetails);

export default router;

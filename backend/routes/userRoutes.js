import express from 'express';
import {
  forgotPassword,
  getAllUsers,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  userDetails,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/password/update', protect, updatePassword);
router.get('/me', protect, userDetails);
router.put('/me/update', protect, updateProfile);
router.get('/admin/users', protect, admin('admin'), getAllUsers);
router.get('/admin/user/:id', protect, admin('admin'), getSingleUser);
router.put('/admin/role/update/:id', protect, admin('admin'), updateUserRole);
router.delete('/admin/delete/user/:id', protect, admin('admin'), deleteUser);

export default router;

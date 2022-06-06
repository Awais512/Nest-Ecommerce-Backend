import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/ErrorResponse.js';
import sendToken from '../utils/jwtToken.js';
import sendMail from '../utils/sendMail.js';
import crypto from 'crypto';

//Register User
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id:
        'https://res.cloudinary.com/awais512/image/upload/v1619789740/awais_285baad08a.jpg',
      url: 'https://res.cloudinary.com/awais512/image/upload/v1619789740/awais_285baad08a.jpg',
    },
  });
  sendToken(user, 200, res);
});

//Login User
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Invalid Email Or Password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('User not Found', 404));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorResponse('Password does not Match', 400));
  }
  sendToken(user, 200, res);
});

//Logout User
const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: 'Logout Successfully' });
});

//Forgot Password
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse('User not Found with this email', 400));
  }
  const resetToken = user.getResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;
  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorResponse(error.message, 500));
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res, next) => {
  // Create Token hash

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorResponse(
        'Reset password url is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorResponse('Password is not matched with the new password', 400)
    );
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

export { register, login, logout, forgotPassword, resetPassword };

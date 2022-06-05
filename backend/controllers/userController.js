import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/ErrorResponse.js';
import sendToken from '../utils/jwtToken.js';

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

export { register, login };

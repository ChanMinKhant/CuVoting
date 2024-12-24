const asyncErrorHandler = require('../utils/asyncErrorHandler');
const customError = require('../utils/CustomError');
const util = require('util');
const User = require('../models/userModel');
//i am not sure it is good or not/ for refresh token or access token
exports.protect = asyncErrorHandler(async (req, res, next) => {
  //Read the token and check if it exists
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    return next(new customError('You are not logged in', 401));
  }

  //valitate the tokenken
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  //if the user exits
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new customError('The user does not exist', 401));
  }

  //if the user changed password after the token was issued
  // i will check it for refresh token

  if (user.isPasswordChanged(decoded.iat)) {
    return next(
      new customError(
        'the password has been changed recently. Please log in again',
        401
      )
    );
  }
  req.user = user;
  //Allow user to access the route
  next();
});

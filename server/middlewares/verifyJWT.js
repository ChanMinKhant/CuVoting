const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const asyncHandler = require('express-async-handler');

exports.verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req?.cookies?.jwt; // cookies.jwt // iam not sure cookie or authrization
  if (!token) {
    const err = new CustomError('Authentication failed', 401);
    return next(err);
  }

  // seaarch token in db
  //   const foundToken = await Token.findOne({ token });
  //   if (!foundToken) {
  //     res.clearCookie('jwt');
  //     const err = new CustomError(
  //       'Your session has expired. Please log in again.',
  //       401
  //     );
  //     return next(err);
  //   }

  // verify token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    // req.userId = decodedToken.id;
    // next();
    if (err) {
      const error = new CustomError('Authentication failed', 401);
      return next(error);
    }
    req.userId = decodedToken.id;
    next();
  });
});

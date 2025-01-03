const CustomError = require('../utils/CustomError');

const devError = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new CustomError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const duplicateValue = Object.values(err.keyValue)[0];
  const message = `${duplicateValue} is already exist.`;
  return new CustomError(message, 400);
};

const handleValidationErrorDB = (err) => {
  // const errors = Object.values(err.errors).map((el) => el.message); //Object.values() return array of values
  const message = `Invalid input data`;
  return new CustomError(message, 400);
};

const handleJWTError = () =>
  new CustomError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new CustomError('Something went! Please log in again.', 401);

module.exports = (err, req, res, next) => {
  const environment = process.env.NODE_ENV || 'development';
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (environment === 'development') {
    devError(err, res);
  } else if (environment === 'production') {
    console.log('error is here');
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    prodError(err, res);
  }
};

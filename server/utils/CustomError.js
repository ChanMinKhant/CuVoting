class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; //for operational error
    Error.captureStackTrace(this, this.constructor); //for stack trace, i dont understand this
    console.log('executed21');
  }
}

module.exports = CustomError;

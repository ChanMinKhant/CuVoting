const joi = require('joi');
const user = require('../models/user');

exports.registerSchema = joi.object({
  email: joi
    .string()
    .email()
    .regex(/@gmail\.com$/)
    .required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
  username: joi.string().required(),
  section: joi.string().allow(''),
  year: joi.string().allow(''),
  deviceId: joi.string().allow(''),
  userType: joi.string().allow(''),
  major: joi.string().allow(''),
  occupation: joi.string().allow(''),
});

exports.loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

exports.otpSchema = joi.object({
  otp: joi.string().required(),
  email: joi
    .string()
    .email()
    .regex(/@gmail\.com$/)
    .required(),
});

//const { deviceId } = req.body;
exports.deviceIdSchema = joi.object({
  deviceId: joi.string().required(),
});

const joi = require('joi');

exports.registerSchema = joi.object({
  email: joi
    .string()
    .email()
    .regex(/@gmail\.com$/)
    .required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
  username: joi.string().required(),
  section: joi.string(),
  year: joi.string(),
  deviceId: joi.string(),
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

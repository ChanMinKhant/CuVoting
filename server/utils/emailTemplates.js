exports.otpEmail = (otp) => {
  return `
    <h1>Your OTP is ${otp}</h1>
    <p>Use this OTP to verify your email</p>
  `;
};

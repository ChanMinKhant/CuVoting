const router = require('express').Router();
const auth = require('../controllers/auth');
const { verifyJWT } = require('../middlewares/verifyJWT');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/submit-otp', auth.submitOtp);
router.post('/resend-otp', auth.resendOtp);
router.post('/get-user', verifyJWT, auth.getMe);

module.exports = router;

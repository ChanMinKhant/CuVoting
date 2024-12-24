const selectorRoutes = require('./selector');
const authRoutes = require('./auth');
const router = require('express').Router();

router.use('/selector', selectorRoutes);
router.use('/auth', authRoutes);

module.exports = router;

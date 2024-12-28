const selectionRoutes = require('./selection');
const authRoutes = require('./auth');
const router = require('express').Router();

router.use('/selection', selectionRoutes);
router.use('/auth', authRoutes);

module.exports = router;

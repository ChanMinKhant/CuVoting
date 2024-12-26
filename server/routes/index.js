const selectionRoutes = require('./selection');
const authRoutes = require('./auth');
const router = require('express').Router();

router.use('/selections', selectionRoutes);
router.use('/auth', authRoutes);

module.exports = router;

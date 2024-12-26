const selection = require('../controllers/selection');
const { verifyJWT } = require('../middlewares/verifyJWT');
const router = require('express').Router();

router.get('/', verifyJWT, selection.getSelections);

module.exports = router;

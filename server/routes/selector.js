const selector = require('../controllers/selector');
const router = require('express').Router();

router.get('/', selector.getSelectors);

module.exports = router;

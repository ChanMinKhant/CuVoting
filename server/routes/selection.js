const selection = require('../controllers/selection');
const { verifyJWT } = require('../middlewares/verifyJWT');
const router = require('express').Router();

router.get('/', verifyJWT, selection.getSelections);
router.post('/vote', verifyJWT, selection.voteSelection);
router.get('/vote-history', verifyJWT, selection.getUserVotedHistories);
router.delete('/delete-vote/:voteId', verifyJWT, selection.deleteVote);

module.exports = router;

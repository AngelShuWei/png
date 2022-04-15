const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { GameStat } = require('../../db/models');

const validateGameStatInfo = [
  check('server')
    .isLength({ min: 1 }, { max: 30 })
    .withMessage('Please provide a server with min 1 and max 30 characters.'),
  check('rank')
    .isLength({ min: 5 }, { max: 30 })
    .withMessage('Please provide a rank with min 5 and max 30 characters.'),
  check('position')
    .isLength({ min: 5 }, { max: 30 })
    .withMessage('Please provide a position with min 5 and max 30 characters.'),
  check('style')
    .isLength({ min: 5}, { max: 30})
    .withMessage('Please provide an playstyle with min 5 and max 30 characters.'),
  check('gameStatsPic')
    .isURL()
    .withMessage('Please upload a valid imageUrl.'),
    handleValidationErrors
];

//get all gamestats
router.get('/', asyncHandler(async(req, res) => {
  const allGameStats = await GameStat.findAll();
  return res.json(allGameStats);
}));

//create gamestats
router.post('/', restoreUser, validateGameStatInfo, asyncHandler(async(req, res) => {
  const { user } = req;
  let { server, rank, position, style, gameStatsPic } = req.body;
  const gameStat = await GameStat.create({
    userId: user.id,
    server,
    rank,
    position,
    style,
    gameStatsPic
  });
  return res.json(gameStat);
}));


module.exports = router;

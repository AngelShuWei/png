const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Game } = require('../../db/models');

//get all games
router.get('/', asyncHandler(async(req, res) => {
  const allGames = await Game.findAll();
  console.log(allGames);
  return res.json(allGames);
}))

module.exports = router;

const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, User } = require('../../db/models');

//TODO VALIDATIORS

router.get('/', asyncHandler(async(req, res) => {
  const allReviews = await Review.findAll({
    include: User
  });
  return res.json(allReviews);
}));

module.exports = router;

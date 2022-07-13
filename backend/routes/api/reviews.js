const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, User } = require('../../db/models');

// VALIDATIORS
const validateReviewInfo = [
  check('content')
    .isLength({ max: 500 })
    .withMessage('The review can be no longer than 500 characters.'),
  check('rating')
    .isInt({ min: 1 , max: 5 })
    .withMessage('Please provide a rating between 1 - 5.'),
    handleValidationErrors
];

// get review
router.get('/', asyncHandler(async(req, res) => {
  const allReviews = await Review.findAll({
    include: User
  });
  return res.json(allReviews);
}));

//create review
router.post('/', restoreUser, validateReviewInfo, asyncHandler(async(req, res) => {
  const { user } = req;
  let { palId, content, rating } = req.body;

  const review = await Review.create({
      userId: user.id,
      palId,
      content,
      rating
  });

  const newReview = await Review.findByPk(review.id, {include: User});
  return res.json(newReview);
}));

router.put('/:reviewId', validateReviewInfo, asyncHandler(async(req, res) => {
  const { reviewId } = req.params;

  let { palId, content, rating } = req.body;

  let review = await Review.findByPk(+reviewId);

  await review.update({
    palId,
    content,
    rating,
  });

  review = await Review.findByPk(+reviewId, { include: User });
  return res.json(review);
}))

router.delete('/:reviewId', asyncHandler(async(req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) throw new Error ('Cannot find review');

  await review.destroy();
  return res.json(review.id);
}));

module.exports = router;

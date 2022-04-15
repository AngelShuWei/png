const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Pal } = require('../../db/models');

const validatePalInfo = [
  // check('nickname')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 3 }, { max: 30 })
  //   .withMessage('Please a nickname with min 3 and max 30 characters.'),
  check('title')
    // .exists({ checkFalsy: true })
    .isLength({ min: 10 }, { max: 50 })
    .withMessage('Please provide a title with min 10 and max 50 characters.'),
  check('description')
    // .exists({ checkFalsy: true })
    .isLength({ min: 10 }, { max: 500 })
    .withMessage('Please provide an introduction at least 10 characters long.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid price range'),
  check('address')
    // .exists({ checkFalsy: true })
    .isLength({ min: 5}, { max: 30})
    .withMessage('Please provide an address with min 5 and max 30 characters.'),
  check('city')
    // .exists({ checkFalsy: true })
    .isLength({ min: 5}, { max: 30})
    .withMessage('Please provide a city with min 5 and max 30 characters.'),
  check('state')
    .isLength({ min:0 })
    .withMessage('Please select a state'),
  check('country')
    .isLength({ min:0 })
    .withMessage('Please select a country'),
  check('palPic')
    .isURL()
    .withMessage('Please upload a valid imageUrl'),
    handleValidationErrors
];

//get all pals
router.get('/', asyncHandler(async(req, res) => {
  const allPals = await Pal.findAll();
  return res.json(allPals);
}));

//create pal
router.post('/', restoreUser, validatePalInfo, asyncHandler(async(req, res) => {
  const { user } = req;
  let { nickname, title, description, palPic, price, address, city, state } = req.body;
  const pal = await Pal.create({
    userId: user.id,
    nickname,
    title,
    description,
    palPic,
    price,
    address,
    city,
    state,
    country: "United States",
  });
  return res.json(pal);
}));


module.exports = router;

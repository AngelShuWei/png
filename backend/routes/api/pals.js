const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Pal, Game } = require('../../db/models');

const validatePalInfo = [
  // check('nickname')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 3 }, { max: 30 })
  //   .withMessage('Please a nickname with min 3 and max 30 characters.'),
  check('server')
    .isLength({ min: 1 }, { max: 30 })
    .withMessage('Please provide a server with max 30 characters.'),
  check('rank')
    .isLength({ min: 1 }, { max: 15 })
    .withMessage('Please provide a rank with max 15 characters.'),
  check('position')
    .isLength({ min: 1 }, { max: 15 })
    .withMessage('Please provide a position with max 15 characters.'),
  check('style')
    .isLength({ min: 1 }, { max: 15})
    .withMessage('Please provide a playstyle with max 15 characters.'),
  check('gameStatsPic')
    .isURL()
    .withMessage('Please upload a valid imageUrl.'),
  check('title')
    // .exists({ checkFalsy: true })
    .isLength({ min: 10 }, { max: 50 })
    .withMessage('Please provide an introduction with min 10 and max 50 characters.'),
  check('description')
    // .exists({ checkFalsy: true })
    .isLength({ min: 10 }, { max: 500 })
    .withMessage('Please provide an introduction at least 10 characters long.'),
  check('price')
    .isInt({ min: 2 , max: 999 })
    .withMessage('Please provide a price between 2.00 - 999.00.'),
  check('address')
    // .exists({ checkFalsy: true })
    .isLength({ min: 5}, { max: 30})
    .withMessage('Please provide an address with min 5 and max 30 characters.'),
  check('city')
    // .exists({ checkFalsy: true })
    .isLength({ min: 5}, { max: 30})
    .withMessage('Please provide a city with min 5 and max 30 characters.'),
  check('state')
    .isLength({ min: 0 })
    .withMessage('Please select a state'),
  // check('country')
  //   .isLength({ min: 0 })
  //   .withMessage('Please select a country'),
  check('palPic')
    .isURL()
    .withMessage('Please upload a valid imageUrl'),
    handleValidationErrors
];

//get all pals
router.get('/', asyncHandler(async(req, res) => {
  const allPals = await Pal.findAll({
    include: Game
  });
  return res.json(allPals);
}));

//create pal
router.post('/', restoreUser, validatePalInfo, asyncHandler(async(req, res) => {
  const { user } = req;
  let { gameId, server, rank, position, style, gameStatsPic, nickname, title, description, palPic, price, address, city, state } = req.body;

  const pal = await Pal.create({
    userId: user.id,  //dont need in update because user has already been established
    gameId,
    server,
    rank,
    position,
    style,
    gameStatsPic,
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

router.put('/:palId', validatePalInfo, asyncHandler(async(req, res) => {
  // console.log("testing backend-------------", palId);
  const { palId } = req.params;

  let { gameId, server, rank, position, style, gameStatsPic, nickname, title, description, palPic, price, address, city, state } = req.body;

  let pal = await Pal.findByPk(+palId);

  await pal.update({
    gameId,
    server,
    rank,
    position,
    style,
    gameStatsPic,
    nickname,
    title,
    description,
    palPic,
    price,
    address,
    city,
    state,
    // country: "United States", // since we're not updating this, we don't need to include
  });

  pal = await Pal.findByPk(+palId, { include: Game });
  return res.json(pal);
}));

router.delete('/:palId', asyncHandler(async(req, res) => {
  const pal = await Pal.findByPk(req.params.palId);
  if (!pal) throw new Error('Cannot find pal listing');

  await pal.destroy();
  return res.json(pal.id);
}));


module.exports = router;

const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Pal, Game } = require('../../db/models');
const { multipleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

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
  // check('gameStatsPic')
  //   .isURL()
  //   .withMessage('Please upload a valid imageUrl.'),
  check('title')
    // .exists({ checkFalsy: true })
    .isLength({ min: 10 }, { max: 50 })
    .withMessage('Please provide an one-liner with min 10 and max 50 characters.'),
  check('description')
    // .exists({ checkFalsy: true })
    .isLength({ min: 10 }, { max: 500 })
    .withMessage('Please provide a detailed self-introduction at least 10 characters long.'),
  check('price')
    .isDecimal({ min: 2.00 , max: 999.99 })
    .withMessage('Please provide a price between 2.00 - 999.99.'),
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
    // check('palPic')
    //   .isURL()
    //   .withMessage('Please upload a valid cover image'),
    // check('country')
    //   .isLength({ min: 0 })
    //   .withMessage('Please select a country'),
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
router.post('/', multipleMulterUpload("gameStatsPic"), restoreUser, validatePalInfo, asyncHandler(async(req, res) => {
  const { user } = req;
  let { gameId, server, rank, position, style, nickname, title, description, price, address, city, state } = req.body;
  const gameStatsPic = await singlePublicFileUpload(req.files[0]);
  const palPic = await singlePublicFileUpload(req.files[1]);

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

  const newPal = await Pal.findByPk(pal.id, {include: Game});
  return res.json(newPal);
}));

router.put('/:palId', multipleMulterUpload("gameStatsPic"), validatePalInfo, asyncHandler(async(req, res) => { //'/:palId(\\d+)' regex

  const { palId } = req.params;

  let { gameId, server, rank, position, style, nickname, title, description, price, address, city, state } = req.body;
  console.log(req.files);
  const gameStatsPic = await singlePublicFileUpload(req.files[0]);
  const palPic = await singlePublicFileUpload(req.files[1]);

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

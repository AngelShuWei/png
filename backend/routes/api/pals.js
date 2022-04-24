const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Pal, Game, Review} = require('../../db/models');
const { multipleMulterUpload, singlePublicFileUpload, multiPartUpload } = require('../../awsS3');

const validatePalInfo = [
  // check('nickname')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 3 }, { max: 30 })
  //   .withMessage('Please a nickname with min 3 and max 30 characters.'),
  check('gameId')
    .exists({ checkFalsy: true })
    .withMessage('Please select a game.'),
  check('server')
    .isLength({ min: 1 }, { max: 30 })
    .withMessage('Please provide a server with max 30 characters.'),
  check('rank')
    .isLength({ min: 1 }, { max: 30 })
    .withMessage('Please provide a rank with max 30 characters.'),
  check('position')
    .isLength({ min: 1 }, { max: 30 })
    .withMessage('Please provide a position with max 30 characters.'),
  check('style')
    .isLength({ min: 1 }, { max: 30})
    .withMessage('Please provide a playstyle with max 30 characters.'),
  // check('gameStatsPic')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please upload a valid screenshot.'),
  check('title')
    .isLength({ min: 10 }, { max: 50 })
    .withMessage('Please provide an one-liner with min 10 and max 50 characters.'),
  check('description')
    .isLength({ min: 10 }, { max: 500 })
    .withMessage('Please provide a detailed self-introduction at least 10 characters long.'),
  // check('palPic')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please upload a valid cover image.'),
  check('price')
    .isDecimal({ min: 2.00, max: 999.99 })
    // .isInt({ min: 2, max: 999})
    .withMessage('Please provide a price between 2.00 - 999.99.'),
  check('address')
    .isLength({ min: 1}, { max: 30})
    .withMessage('Please provide an address with min 5 and max 30 characters.'),
  check('city')
    .isLength({ min: 1}, { max: 30})
    .withMessage('Please provide a city with min 5 and max 30 characters.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please select a state.'),
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
router.post('/', multiPartUpload("gameStatsPic", "palPic"), restoreUser, validatePalInfo, asyncHandler(async(req, res) => {
  const { user } = req;
  let { gameId, server, rank, position, style, nickname, title, description, price, address, city, state } = req.body;

  // console.log('reqfilessss@@@@@@@@@', req.files);

  const gameStatsPic = await singlePublicFileUpload(req.files.gameStatsPic[0]);
  const palPic = await singlePublicFileUpload(req.files.palPic[0]);

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

router.put('/:palId', multiPartUpload("gameStatsPic", "palPic"), validatePalInfo, asyncHandler(async(req, res) => { //'/:palId(\\d+)' regex

  const { palId } = req.params;

  let { gameId, server, rank, position, style, gameStatsPic, palPic, nickname, title, description, price, address, city, state } = req.body;

  // console.log('reqfilessss@@@@', req.files);
  // console.log('^^^^', req.files.gameStatsPic);
  // console.log('!!!', req.files.palPic)
  // console.log('this api route workinggggggg')
  let fileLength = 0;
  for (key in req.files) {
    fileLength += 1;
  }

  if (fileLength === 2) {
    gameStatsPic = await singlePublicFileUpload(req.files.gameStatsPic[0]);
    palPic = await singlePublicFileUpload(req.files.palPic[0]);
  } else if (fileLength === 1 ) {
      if (req.files.gameStatsPic && !req.files.palPic) {
        gameStatsPic = await singlePublicFileUpload(req.files.gameStatsPic[0]);
        palPic = palPic;
      } else if (req.files.palPic && !req.files.gameStatsPic) {
        palPic = await singlePublicFileUpload(req.files.palPic[0]);
        gameStatsPic = gameStatsPic;
      }
  } else {
    gameStatsPic = gameStatsPic;
    palPic = palPic;
  }

  console.log('----gamestatspic', gameStatsPic)
  console.log('----palpic', palPic)

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

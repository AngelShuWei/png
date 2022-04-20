const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
    // .custom(value => {
    //   console.log("=======",User.findOne({ where: {email: value} }))
    //   return User.findOne({ where: {email: value} })
    //   .then(() => {
    //     return Promise.reject('Email is already taken')
    //   })
    // }),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide an unique username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('nickname')
    .isLength({ min: 1}, {max: 30})
    .withMessage('Please provide a nickname maximum 30 characters.'),
  check('bio')
    .isLength({ min: 10}, {max: 500})
    .withMessage('Please provide a bio at least 10 characters long.'),
  check('gender')
    .exists({ checkFalsy: true })
    .withMessage('Please select a gender.'),
  check('profilePic')
    .isURL()
    .withMessage('Please upload a valid profile picture.'),
  handleValidationErrors
];

//get all users
router.get('/', asyncHandler(async(req, res) => {
  const allUsers = await User.findAll();
  return res.json({allUsers});
}))

// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username, nickname, bio, gender, profilePic } = req.body; //getting the info from the body
    const user = await User.signup({ email, username, password, nickname, bio, gender, profilePic});

    await setTokenCookie(res, user); //returns a JSON response w/ the user info

    return res.json({ //return the json response w/ user info
      user //if creation of the user is unsucessful, sequelize validation error will be pasesd onto next error-handling middleware
    });
  })
);

module.exports = router;

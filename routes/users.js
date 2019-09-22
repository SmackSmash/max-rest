const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

// @route   POST /users/signup
// @desc    Sign up user
// @access  Public
router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      const error = new Error(`User already exists with email ${email}`);
      error.status = 409;
      return next(error);
    }
    const hashed = await bcrypt.hash(password, 10);
    user = new User({
      email,
      password: hashed
    });
    await user.save();
    const payload = {
      user: {
        email
      }
    };
    const token = jwt.sign(payload, jwtSecret);
    res.send({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
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
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '2 days' });
    res.send({ token });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// @route   POST /users/signin
// @desc    Sign in user
// @access  Public
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }
    const payload = {
      user: {
        email
      }
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '2 days' });
    res.send({ token });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// @route   DELETE /users/:idv
// @desc    Delete user
// @access  Private
router.delete('/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error(`No user exists with ID ${id}`);
      error.status = 404;
      return next(error);
    }
    if (user.email !== req.user.email) {
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }
    await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;

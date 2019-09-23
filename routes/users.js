const router = require('express').Router();
const auth = require('../middleware/auth');
const { signUpUser, signInUser, deleteUser } = require('../controllers/users');

// @route   POST /users/signup
// @desc    Sign up user
// @access  Public
router.post('/signup', signUpUser);

// @route   POST /users/signin
// @desc    Sign in user
// @access  Public
router.post('/signin', signInUser);

// @route   DELETE /users/:idv
// @desc    Delete user
// @access  Private
router.delete('/:id', auth, deleteUser);

module.exports = router;

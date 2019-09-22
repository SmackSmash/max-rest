const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    const error = new Error('No auth token provided');
    error.status = 401;
    return next(error);
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

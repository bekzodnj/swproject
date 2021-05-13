const jwt = require('jsonwebtoken');
const config = require('config');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  //get token form header
  const token = req.header('x-auth-token');

  // check token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

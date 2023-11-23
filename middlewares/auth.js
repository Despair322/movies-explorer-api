const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const UnathorizedError = require('../errors/unathorized-error');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new UnathorizedError('необходима авторизация'));
    }
    UserModel.findById(decoded._id)
      .orFail(() => next(new UnathorizedError('необходима авторизация')))
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => next(new Error()));
  });
};

module.exports = auth;

const UserModel = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const getUser = (req, res, next) => {
  const id = req.user._id;
  UserModel.findById(id)
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then((user) => {
      const { _id, ...userWithoutID } = user;
      return res.send(userWithoutID);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Невалидный ID'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  UserModel.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Невалидный ID'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  updateUser,
};

const MovieModel = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  const id = req.user._id;
  MovieModel.find({ owner: id })
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Невалидный ID'));
      }
      return next(new Error());
    });
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieData = req.body;
  MovieModel.create({ ...movieData, owner })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(new Error());
    });
};

const deleteMovieById = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .orFail(() => next(new NotFoundError('Карточка не найдена')))
    .then((movie) => {
      if (movie.owner.toString() !== owner.toString()) {
        return next(new ForbiddenError('Попытка удаления чужой карточки'));
      }
      MovieModel.deleteOne(movie)
        // .orFail(() => next(new NotFoundError('Карточка не найдена')))
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Невалидный ID'));
      }
      return next(new Error());
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};

const MovieModel = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  MovieModel.find({ owner })
    .orFail(() => next(new NotFoundError('Фильмов не найдено')))
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
  const { id } = req.params;
  MovieModel.findById(id)
    .orFail(() => next(new NotFoundError('Фильм не найден')))
    .then((movie) => {
      if (movie.owner.toString() !== owner.toString()) {
        return next(new ForbiddenError('Попытка удаления чужого фильма'));
      }
      MovieModel.deleteOne(movie)
        .then((deletedCard) => res.send(deletedCard))
        .catch(() => next(new Error()));
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

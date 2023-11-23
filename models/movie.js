const mongoose = require('mongoose');
// const validator = require('validator');
const { regex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'поле country должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'поле director должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'поле duration должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'поле year должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'поле description должно быть заполнено'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Некорректный URL image',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Некорректный URL trailer',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => regex.test(v),
      message: 'Некорректный URL thumbnail',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'поле movieId должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'поле nameRU должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'поле nameEN должно быть заполнено'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);

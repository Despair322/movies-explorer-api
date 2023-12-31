const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login, logout,
} = require('../controllers/login');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);
router.get('/signout', logout);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/constants');
const {
  getUser, updateUser,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(regex),
    name: Joi.string().pattern(regex),
  }),
}), updateUser);

module.exports = router;

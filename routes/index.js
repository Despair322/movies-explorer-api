const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const loginRouter = require('./login');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.use('/', loginRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Несуществующий маршрут')));

module.exports = router;

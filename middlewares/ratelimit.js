const setRateLimit = require('express-rate-limit');

const limiter = setRateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Вы исчерпали лимит обращений к серверу: 100 в минуту',
  headers: true,
});

module.exports = limiter;

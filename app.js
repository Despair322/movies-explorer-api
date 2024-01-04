const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();
const appRouter = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/ratelimit');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_URL, {}).then(() => {
  console.log('Connected to MongoDB');
});
const app = express();

app.use(limiter);
app.use(cors({
  credentials: true,
  origin: ['movie-explorer.dymov.nomoredomainsmonster.ru',
    'localhost:3000'],
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use('/', appRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Movies explorer app listening on port ${PORT}`);
});

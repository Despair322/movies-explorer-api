const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/movies' } = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
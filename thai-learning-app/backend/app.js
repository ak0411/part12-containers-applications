const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const wordsRouter = require('./routes/words');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/words', wordsRouter);

module.exports = app;

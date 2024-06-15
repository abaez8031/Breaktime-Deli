const express = require('express');
const path = require('path');
const { isProduction } = require("./config/keys");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const csurf = require("csurf");
const debug = require('debug')
require('./models/User');
const usersRouter = require('./routes/api/users');
const tweetsRouter = require("./routes/api/tweets");
const csrfRouter = require('./routes/api/csrf')
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!isProduction) app.use(cors())
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

// Attach routers
app.use('/api/users', usersRouter);
app.use('/api/tweets', tweetsRouter);
app.use('/api/csrf', csrfRouter)

// Custom middleware for catching all unmatched requests and formatting a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');

// Custom error handler that will be called when a route handler/middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors
  })
});
module.exports = app;

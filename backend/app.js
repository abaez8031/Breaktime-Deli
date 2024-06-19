const express = require('express');
const { isProduction } = require("./config/keys");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const csurf = require("csurf");
const debug = require('debug')
require('./models/User');
require("./config/passport");
const passport = require("passport");
const usersRouter = require('./routes/api/users');
const productsRouter = require("./routes/api/products");
const csrfRouter = require('./routes/api/csrf');
const reviewsRouter = require('./routes/api/reviews');
const suggestionsRouter = require("./routes/api/suggestions")
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
if (!isProduction) app.use(cors());
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
app.use('/api/products', productsRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/suggestions', suggestionsRouter);

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

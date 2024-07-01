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
const suggestionsRouter = require("./routes/api/suggestions");
const ordersRouter = require("./routes/api/orders");
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
if (!isProduction) {
  // enable CORS only in development because React will be on the React development server (http://localhost:3000). In production, React files will be served statically on the Express server
  app.use(cors());
}

app.use(
  // Set the _csrf token and create req.csrfToken method to generate a hashed CSRF token
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
app.use('/api/orders', ordersRouter);

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

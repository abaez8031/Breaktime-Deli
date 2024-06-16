const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require("jsonwebtoken")
const { secretOrKey } = require("./keys")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

passport.use(new LocalStrategy({
  session: false,
  usernameField: 'username',
  passwordField: 'password',
}, async function (username, password, done) {
  const user = await User.findOne({ username });
  // look for user with the matching username in DB
  if (user) {
    // if there is a found user, compare the input pw to hash in DB using bcrypt
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) done(null, false);
      else done(null, user);
      // return the user
    });
  } else
    done(null, false);
}));

exports.loginUser = async(user) => {
  // create an object with non-sensitive user information to send back
  const userInfo = {
    _id: user._id,
    username: user.username
  }
  const token = await jwt.sign(
    userInfo,
    secretOrKey,
    { expiresIn: 3600}
  )
  return {
    user: userInfo,
    token
  }
}

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

exports.requireUser = passport.authenticate('jwt', { session: false });

exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};
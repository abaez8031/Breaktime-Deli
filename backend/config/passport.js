const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require("jsonwebtoken")
const { secretOrKey } = require("./keys")

passport.use(new LocalStrategy({
  session: false,
  usernameField: 'username',
  passwordField: 'password',
}, async function (username, password, done) {
  const user = await User.findOne({ username });
  if (user) {
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) done(null, false);
      else done(null, user);
    });
  } else
    done(null, false);
}));

exports.loginUser = async(user) => {
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
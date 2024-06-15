const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User")

router.post('/register', async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username })
  if(user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    err.errors = {
      username: "Username already exists"
    }
    return next(err)
  }
  const newUser = new User({
    username
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json({ user });
      }
      catch(err) {
        next(err);
      }
    })
  });
  
});

module.exports = router;

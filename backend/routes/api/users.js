const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys")
const validateLoginInput = require("../../validations/Login")
const validateRegisterInput = require("../../validations/Register")

router.post("/register", validateRegisterInput, async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    err.errors = {
      username: "Username already exists",
    };
    return next(err);
  }
  const newUser = new User({
    username,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid Credentials");
      err.statusCode = 400;
      err.errors = { password: "Invalid username or password" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get("/current", restoreUser, (req,res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if(!req.user) return res.json(null)
  res.json({
    _id: req.user._id,
    username: req.user.username
  })
})

router.delete("/:id", async(req,res,next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err)
    }
    return res.json(deletedUser);
  } catch(err) {
    return next(err)
  }
})

module.exports = router;

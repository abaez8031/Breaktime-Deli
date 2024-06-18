const mongoose = require("mongoose");
const {mongoURI: db} = require("../config/keys");
const User = require("../models/User");
const Review = require("../models/Review");
const Suggestion = require("../models/Suggestion");
const bcrypt = require('bcryptjs');
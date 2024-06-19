const mongoose = require("mongoose");
const {mongoURI: db} = require("../config/keys");
const User = require("../models/User");
const Review = require("../models/Review");
const Suggestion = require("../models/Suggestion");
const bcrypt = require('bcryptjs');

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {
    console.log("Resetting db and seeding users and tweets...");
  
    User.collection.drop()
                   .then(() => Tweet.collection.drop())
                   .then(() => User.insertMany(users))
                   .then(() => Tweet.insertMany(tweets))
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }

const user1 = new User({
  username: "harrypotter",
  hashedPassword: bcrypt.hashSync('potter', 10)
})

const review1 = new Review({
  userId: user1._id,
  rating: 5,
  text: "What a lovely establishment"
})

const suggestion1 = new Suggestion({
  userId: user1._id,
  text: "We would love if you started selling some lorem ipsum!"
})
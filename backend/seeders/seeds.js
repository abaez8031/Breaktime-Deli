require("dotenv").config()
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys");
const User = require("../models/User");
const Review = require("../models/Review");
const Suggestion = require("../models/Suggestion");
const Product = require("../models/Product");
const bcrypt = require('bcryptjs');

// Connect to database
mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = async () => {
    try {
      console.log("Resetting db and seeding...");
      await User.collection.drop();
      await Review.collection.drop();
      await Suggestion.collection.drop();
      await Product.collection.drop();

      const users = [
        new User ({
          username: "harrypotter",
          hashedPassword: bcrypt.hashSync("potter", 10)
        }),
        new User ({
          username: "hermione",
          hashedPassword: bcrypt.hashSync("granger", 10)
        }),
        new User ({
          username: "ronweasley",
          hashedPassword: bcrypt.hashSync("weasley", 10)
        }),
        new User ({
          username: "rubeus",
          hashedPassword: bcrypt.hashSync("hagrid", 10)
        }),
        new User ({
          username: "albus",
          hashedPassword: bcrypt.hashSync("dumbledore", 10)
        }),
        new User ({
          username: "unclevernon",
          hashedPassword: bcrypt.hashSync("dursley", 10)
        }),
        new User ({
          username: "ginny",
          hashedPassword: bcrypt.hashSync("weasley", 10)
        })
      ]
      const insertedUsers = await User.insertMany(users);

      const reviews = [
        new Review({
          userId: insertedUsers[0]._id,
          rating: 5,
          text: "They always keep the chocolate frogs in full stock. My favorite"
        }),
        new Review({
          userId: insertedUsers[1]._id,
          rating: 5,
          text: "So glad this store is in my neighborhood. They got everything I need"
        }),
        new Review({
          userId: insertedUsers[2]._id,
          rating: 5,
          text: "This is a bloody fine store, I do say."
        }),
        new Review({
          userId: insertedUsers[3]._id,
          rating: 5,
          text: "The people here are soo nice. My favorite bodega"
        }),
        new Review({
          userId: insertedUsers[4]._id,
          rating: 5,
          text: "Holy mackerel what a tuna fish sandwich. 10/10"
        }),
        new Review({
          userId: insertedUsers[5]._id,
          rating: 5,
          text: "These bacon egg and cheese are the knees bees!"
        }),
        new Review({
          userId: insertedUsers[6]._id,
          rating: 5,
          text: "What a lovely establishment!"
        })
      ]

      await Review.insertMany(reviews)

      const suggestions = [
        new Suggestion({
          userId: insertedUsers[0]._id,
          text: "You do need to start selling some wands. That way I can just come here for everything I need"
        }),
        new Suggestion({
          userId: insertedUsers[0]._id,
          text: "Oh also if you started getting Magic The Gathering cards I would buy them all"
        }),
        new Suggestion({
          userId: insertedUsers[1]._id,
          text: "Please please please get the new lorem ipsum"
        }),
        new Suggestion({
          userId: insertedUsers[1]._id,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh ex, vitae facilisis eros aliquet sed."
        }),
        new Suggestion({
          userId: insertedUsers[2]._id,
          text: "Etiam fringilla metus non suscipit semper. Etiam ut sapien non odio auctor tincidunt ut ac odio. Integer orci nisi, fringilla ac finibus vitae, congue id metus."
        }),
        new Suggestion({
          userId: insertedUsers[3]._id,
          text: "Etiam fringilla metus non suscipit semper. Etiam ut sapien non odio auctor tincidunt ut ac odio. Integer orci nisi, fringilla ac finibus vitae, congue id metus."
        }),
        new Suggestion({
          userId: insertedUsers[4]._id,
          text: "Praesent in odio et lorem pulvinar auctor a in nibh. Curabitur vitae tempus sem."
        }),
        new Suggestion({
          userId: insertedUsers[5]._id,
          text: "Praesent in odio et lorem pulvinar auctor a in nibh. Curabitur vitae tempus sem."
        }),
        new Suggestion({
          userId: insertedUsers[6]._id,
          text: "Aliquam felis dolor, fringilla eu molestie quis, imperdiet ut sem. Nulla ex eros, mollis a diam ut, aliquet sodales elit."
        }),
        new Suggestion({
          userId: insertedUsers[2]._id,
          text: "Aliquam felis dolor, fringilla eu molestie quis, imperdiet ut sem. Nulla ex eros, mollis a diam ut, aliquet sodales elit."
        }),
        new Suggestion({
          userId: insertedUsers[3]._id,
          text: "Proin eget magna mollis, fringilla sapien vitae, dictum ligula. Integer sodales justo ac nunc fermentum, at dictum mauris interdum. Phasellus varius scelerisque tortor in scelerisque. Donec sed dignissim leo."
        }),
        new Suggestion({
          userId: insertedUsers[4]._id,
          text: "Fusce bibendum tincidunt lobortis. Nullam interdum vehicula risus, id lobortis ante ultrices vel."
        }),
        new Suggestion({
          userId: insertedUsers[5]._id,
          text: "Sed facilisis semper mauris, a tincidunt lectus dictum et. Phasellus eu nunc malesuada, pretium orci eget, vestibulum eros."
        }),
        new Suggestion({
          userId: insertedUsers[6]._id,
          text: "Fusce bibendum tincidunt lobortis. Nullam interdum vehicula risus, id lobortis ante ultrices vel."
        }),
        new Suggestion({
          userId: insertedUsers[1]._id,
          text: "Sed facilisis semper mauris, a tincidunt lectus dictum et. Phasellus eu nunc malesuada, pretium orci eget, vestibulum eros."
        }),
      ]

      await Suggestion.insertMany(suggestions)

      const products = [
        // create array of new products here
      ]

      // await Product.insertMany(products) INSERT INTO DB HERE

      console.log("Done!");
      mongoose.disconnect();
    } catch(err) {
      console.error(err.stack);
      process.exit(1)
    }
  }
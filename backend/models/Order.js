const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sandwichSchema = new Schema({
  bread: {
    type: String,
    required: true
  },
  meat: [String],
  cheese: [String],
  veggies: [String],
  condiments: [String],
  eggs: { 
    type: Number, 
    default: 0
  },
  hot: {
    type: Boolean,
    default: false
  },
  toasted: {
    type: Boolean,
    default: false
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  sandwiches: [sandwichSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Order", orderSchema);
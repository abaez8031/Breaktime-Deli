const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  sandwiches: [{
    type: Schema.Types.ObjectId,
    ref: "Sandwich"
  }],
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
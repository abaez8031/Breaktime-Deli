const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const { requireUser } = require("../../config/passport");

router.post("/", async (req,res) => {
  try {
    const {sandwiches, totalPrice, userId } = req.body;
    const order = new Order({
      sandwiches,
      user: userId,
      totalPrice
    })
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
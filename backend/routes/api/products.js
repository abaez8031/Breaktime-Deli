const express = require("express");
const Product = require("../../models/Product");
const validateProductInput = require("../../validations/Product");
const router = express.Router();

router.get("/", async (req,res,next) => {
  try {
    const products = await Product.find({})
    return res.json(products)
  } catch(err) {
    next(err)
  }
})

router.post("/", validateProductInput, async (req,res,next) => {
  try {
    const { name, price, description } = req.body;
    const foundProduct = Product.findOne({name});
    if (foundProduct) {
      const err = new Error("Validation Error");
      err.statusCode = 400;
      err.errors = {
        name: "Product already exists!"
      }
      return next(err)
    }
    const newProduct = new Product({
      name, price, description
    })
    const savedProduct = newProduct.save()
    res.status(201).json(savedProduct)
  } catch(err) {
    next(err)
  }
})

router.delete("/:id", async (req,res,next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct)
  } catch (err) {
    next(err);
  }
})

router.patch("/:id", validateProductInput, async (req,res,next) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: {price, name} }, {new: true, runValidators: true});
    if (!updatedProduct) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      return next(err)
    }
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
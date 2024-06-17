const express = require("express");
const Product = require("../../models/Product");
const validateProductInput = require("../../validations/Product");
const router = express.Router();

router.post("/", validateProductInput, async (req,res,next) => {

})

module.exports = router;
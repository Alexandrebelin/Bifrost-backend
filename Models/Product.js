const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  description: String,
  details: Array,
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = Product;

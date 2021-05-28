const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  description: String,
  brand: String,
  color: String,
  quantitie: Number,
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = Product;

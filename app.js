const express = require("express");
const formidable = require("express-formidable");

const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(formidable());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productRoutes = require("./Routes/product");
app.use(productRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to Phone API");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This road does not exist" });
});

module.exports = app;

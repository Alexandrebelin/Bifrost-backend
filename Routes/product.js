const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

// MODELS IMPORT

const Product = require("../Models/Product");

// PUBLISH A PRODUCT

router.post("/product/publish", async (req, res) => {
  try {
    const { title, price, description, brand, condition, color, quantitie } =
      req.fields;
    if (
      title &&
      description &&
      price &&
      brand &&
      color &&
      condition &&
      quantitie
    ) {
      const newProduct = new Product({
        title: title,
        price: price,
        description: description,
        brand: brand,
        color: color,
        condition: condition,
        quantitie: quantitie,
      });

      //   Upload the picture

      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: "/Phone/product/",
      });

      newProduct.image = result;

      await newProduct.save();

      res.status(200).json(newProduct);
    } else {
      res.status(400).json({ error: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Find a product by id

router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Find all the products

router.get("/product", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update a product

router.put("/product/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productToModify = await Product.findById(id);
    const { title, price, description, brand, condition, color, quantitie } =
      req.fields;

    if (title) {
      productToModify.title = title;
    }
    if (price) {
      productToModify.price = price;
    }
    if (description) {
      productToModify.description = description;
    }

    if (brand) {
      productToModify.brand = brand;
    }

    if (condition) {
      productToModify.condition = condition;
    }

    if (color) {
      productToModify.color = color;
    }

    if (quantitie) {
      productToModify.quantitie = quantitie;
    }

    if (req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        public_id: `Phone/product/${productToModify._id}`,
      });
      productToModify.image = result;
    }
    await productToModify.save();
    res.status(200).json(productToModify);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Delete a product

router.delete("/product/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let productToDelete = await Product.findById(id);

    const imageToDelete = productToDelete.image.public_id;

    if (productToDelete) {
      await cloudinary.api.delete_resources_by_prefix(`${imageToDelete}`);
      await productToDelete.delete();

      res.status(200).json("Product deleted succesfully");
    } else {
      res.status(400).json({
        message: "Bad request",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

const app = require("../app");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const Product = require("../Models/Product");

describe("product.js", () => {
  let mongoServer;

  beforeEach(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) console.log(err);
      }
    );
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  //   Publish a product

  it("publish a product", async () => {
    const response = await request(app)
      .post("/product/publish")
      .set("content-type", "multipart/form-data")
      .field("title", "apple")
      .field("description", "test1")
      .field("price", 100)
      .field("brand", "apple")
      .field("color", "white")
      .field("quantitie", 10)
      .attach("image", "img/imgTest.jpeg");
    expect(response.body._id).toBeDefined();
  });

  // Get all the products

  it("get all the products", async () => {
    const response = await request(app)
      .post("/product/publish")
      .set("content-type", "multipart/form-data")
      .field("title", "apple")
      .field("description", "test1")
      .field("price", 100)
      .field("brand", "apple")
      .field("color", "white")
      .field("quantitie", 10)
      .attach("image", "img/imgTest.jpeg");

    const response2 = await request(app).get("/product");

    expect(response2.body[0]._id).toBeDefined();
  });

  // Get a product by id

  it("get a product by id", async () => {
    const response = await request(app)
      .post("/product/publish")
      .set("content-type", "multipart/form-data")
      .field("title", "apple")
      .field("description", "test1")
      .field("price", 100)
      .field("brand", "apple")
      .field("color", "white")
      .field("quantitie", 10)
      .attach("image", "img/imgTest.jpeg");

    const id = response.body._id;

    const response2 = await request(app).get(`/product/${id}`);

    expect(response2.body._id).toBeDefined();
  });

  //   Update a product

  it("update a product", async () => {
    const response = await request(app)
      .post("/product/publish")
      .set("content-type", "multipart/form-data")
      .field("title", "apple")
      .field("description", "test1")
      .field("price", 100)
      .field("brand", "apple")
      .field("color", "white")
      .field("quantitie", 10)
      .attach("image", "img/imgTest.jpeg");

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/product/update/${id}`)
      .set("content-type", "multipart/form-data")
      .field({ title: "newTitle" })
      .field({ description: "test2" })
      .field({ price: 200 })
      .field({ brand: "xiaomi" })
      .field({ color: "green" })
      .field({ quantitie: 1 })
      .attach("image", "img/imgTest2.jpeg");

    expect(response2.body.title).toEqual("newTitle");
    expect(response2.body.description).toEqual("test2");
    expect(response2.body.price).toEqual(200);
    expect(response2.body.brand).toEqual("xiaomi");
    expect(response2.body.color).toEqual("green");
    expect(response2.body.quantitie).toEqual(1);
  });

  //   Delete a product

  it("delete a product", async () => {
    const response = await request(app)
      .post("/product/publish")
      .set("content-type", "multipart/form-data")
      .field("title", "apple")
      .field("description", "test1")
      .field("price", 100)
      .field("brand", "apple")
      .field("color", "white")
      .field("quantitie", 10)
      .attach("image", "img/imgTest.jpeg");

    const id = response.body._id;

    const response2 = await request(app).delete(`/product/delete/${id}`);

    expect(response2.body).toEqual("Product deleted succesfully");
  });
});

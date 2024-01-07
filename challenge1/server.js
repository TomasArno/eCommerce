import express, { json, urlencoded } from "express";

import ProductsManager from "./src/data/fs/products.fs.js";
import UsersManager from "./src/data/fs/users.fs.js";

const app = express();

const PORT = 8080;

app.listen(PORT, () => console.log("Server running on port " + PORT));

app.use(json());
app.use(urlencoded({ extended: true }));

app.post("/api/products", async (req, res) => {
  try {
    const data = await ProductsManager.create(req.body);

    if (typeof data === "string")
      return res.json({
        statusCode: 400,
        response: data,
      });

    res.json({
      statusCode: 200,
      response: data,
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await ProductsManager.readFile();

    if (!products.length)
      return res.json({
        statusCode: 404,
        response: "Products not found",
      });

    res.json({
      statusCode: 200,
      response: products,
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.get("/api/products/:pId", async (req, res) => {
  try {
    const { pId } = req.params;

    const product = await ProductsManager.readOne(pId);

    if (!product)
      return res.json({
        statusCode: 404,
        response: "Product not found",
      });

    res.json({
      statusCode: 200,
      response: product,
    });
  } catch (e) {
    console.log(e);
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.patch("/api/products/:pId", async (req, res) => {
  try {
    const { pId } = req.params;

    const product = await ProductsManager.update(pId, req.body);

    if (!product)
      return res.json({
        statusCode: 404,
        response: "Product not found",
      });

    res.json({
      statusCode: 200,
      response: product,
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.delete("/api/products/:pId", async (req, res) => {
  try {
    const { pId } = req.params;

    const removedProduct = await ProductsManager.destroy(pId);

    if (!removedProduct)
      return res.json({
        statusCode: 404,
        response: "Product not found",
      });

    res.json({
      statusCode: 200,
      response: "Product successfully deleted",
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const data = await UsersManager.create(req.body);

    if (typeof data === "string")
      return res.json({
        statusCode: 400,
        response: data,
      });

    res.json({
      statusCode: 200,
      response: data,
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await UsersManager.readFile();

    if (!users.length)
      return res.json({
        statusCode: 404,
        response: "Users not found",
      });

    res.json({
      statusCode: 200,
      response: users,
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

app.get("/api/users/:uId", async (req, res) => {
  try {
    const { uId } = req.params;

    const user = await UsersManager.readOne(uId);

    if (!user)
      return res.json({
        statusCode: 404,
        response: "User not found",
      });

    res.json({
      statusCode: 200,
      response: user,
    });
  } catch (e) {
    res.json({
      statusCode: 500,
      response: e,
    });
  }
});

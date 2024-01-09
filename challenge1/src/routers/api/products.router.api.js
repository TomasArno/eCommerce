import { Router } from "express";

import ProductsManager from "../../data/fs/products.fs.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
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
    next(e);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsManager.read();

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
    next(e);
  }
});

productsRouter.get("/:pId", async (req, res, next) => {
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
    next(e);
  }
});

productsRouter.patch("/:pId", async (req, res, next) => {
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
    next(e);
  }
});

productsRouter.delete("/:pId", async (req, res, next) => {
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
    next(e);
  }
});

export default productsRouter;

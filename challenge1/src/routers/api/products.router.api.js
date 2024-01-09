import { Router } from "express";

import ProductsManager from "../../data/fs/products.fs.js";

import { checkProductId } from "../../middlewares/checkProductId.mid.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = await ProductsManager.create(req.body);

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

productsRouter.get("/:pId", checkProductId, async (req, res, next) => {
  try {
    const { pId } = req.params;

    const product = await ProductsManager.readOne(pId);

    res.json({
      statusCode: 200,
      response: product,
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.patch("/:pId", checkProductId, async (req, res, next) => {
  try {
    const { pId } = req.params;

    await ProductsManager.update(pId, req.body);

    res.json({
      statusCode: 200,
      response: "Product successfully modified",
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.delete("/:pId", checkProductId, async (req, res, next) => {
  try {
    const { pId } = req.params;

    await ProductsManager.destroy(pId);

    res.json({
      statusCode: 200,
      response: "Product successfully deleted",
    });
  } catch (e) {
    next(e);
  }
});

export default productsRouter;

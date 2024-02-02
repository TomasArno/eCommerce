import { Router } from "express";

import { Products } from "../../data/mongo/mongo.manager.js";

import { checkProductId } from "../../middlewares/checkProductId.mid.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Products.create(req.body);

    res.json({
      statusCode: 201,
      response: data,
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const { title, price, stock } = req.query;

    const filter = {};
    const order = { title: req.query.order || 1 };

    if (title) filter.title = title;
    if (price) filter.price = price;
    if (stock) filter.stock = stock;

    const products = await Products.read({ filter, order });

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

productsRouter.get("/:productId", checkProductId, async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Products.readOne(productId);

    res.json({
      statusCode: 200,
      response: product,
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.put("/:productId", checkProductId, async (req, res, next) => {
  try {
    const { productId } = req.params;

    const modifiedProduct = await Products.update(productId, req.body);

    res.json({
      statusCode: 200,
      response: modifiedProduct,
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.delete("/:productId", checkProductId, async (req, res, next) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Products.destroy(productId);

    res.json({
      statusCode: 200,
      response: deletedProduct,
    });
  } catch (e) {
    next(e);
  }
});

export default productsRouter;

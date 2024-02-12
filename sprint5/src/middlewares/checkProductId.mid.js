import { Products } from "../data/mongo/mongo.manager.js";

export async function checkProductId(req, res, next) {
  const productId = req.params.productId || req.body.productId;

  const productSearched = await Products.readOne(productId);

  if (!productSearched) {
    res.json({ statusCode: 404, response: "Product not found" });
  } else {
    next();
  }
}

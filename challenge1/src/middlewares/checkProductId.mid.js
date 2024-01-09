import ProductsManager from "../data/fs/products.fs.js";

export async function checkProductId(req, res, next) {
  const pId = req.params.pId || req.body.pId;

  const productSearched = await ProductsManager.readOne(pId);

  if (!productSearched) {
    res.json({ statusCode: 404, response: "Product not found" });
  } else {
    next();
  }
}

import products from '../services/products.service.js';


export async function checkProductId(req, res, next) {
  try {
    const productId = req.params.productId || req.body.productId;

    const searchedProduct = await products.readOne(productId);

    req._product = searchedProduct;

    next();
  } catch (error) {
    res.json({
      statusCode: 404,
      message: 'Product doesn´t exists',
    });
  }
}

import { Products } from '../data/mongo/mongo.manager.js';

export async function checkProductId(req, res, next) {
	try {
		const productId = req.params.productId || req.body.productId;

		const searchedProduct = await Products.readOne(productId);

		req._product = searchedProduct;

		next();
	} catch (error) {
		res.json({
			statusCode: 404,
			message: 'Product doesn´t exists',
		});
	}
}

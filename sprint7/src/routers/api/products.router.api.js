import { Router } from 'express';

import { Products } from '../../data/mongo/mongo.manager.js';

import isAdmin from '../../middlewares/isAdmin.mid.js';
import verifyToken from '../../middlewares/verifyToken.mid.js';
import { checkProductId } from '../../middlewares/checkProductId.mid.js';

const productsRouter = Router();

productsRouter.post(
	'/',
	/*verifyToken, isAdmin,*/ async (req, res, next) => {
		try {
			const data = await Products.create(req.body);

			res.json({
				statusCode: 201,
				response: data,
			});
		} catch (e) {
			next(e);
		}
	}
);

productsRouter.get('/', verifyToken, async (req, res, next) => {
	try {
		const { title, price, stock, page, limit } = req.query;

		const filter = {};

		if (title) filter.title = title;
		if (price) filter.price = price;
		if (stock) filter.stock = stock;

		const sortAndPaginate = { page, limit };

		if (!page) sortAndPaginate.page = 1;
		if (!limit) sortAndPaginate.limit = 20;

		const products = await Products.read({ filter, sortAndPaginate });

		res.json({
			statusCode: 200,
			response: products,
		});
	} catch (e) {
		next(e);
	}
});

productsRouter.get(
	'/:productId',
	verifyToken,
	checkProductId,
	async (req, res, next) => {
		try {
			res.json({
				statusCode: 200,
				response: req._product,
			});
		} catch (e) {
			next(e);
		}
	}
);

productsRouter.put(
	'/:productId',
	verifyToken,
	isAdmin,
	checkProductId,
	async (req, res, next) => {
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
	}
);

productsRouter.delete(
	'/:productId',
	verifyToken,
	isAdmin,
	checkProductId,
	async (req, res, next) => {
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
	}
);

export default productsRouter;

import { Router } from 'express';

import { Orders } from '../../data/mongo/mongo.manager.js';

import { checkUserId } from '../../middlewares/checkUserId.mid.js';
import { checkOrderId } from '../../middlewares/checkOrderId.mid.js';
import { checkProductId } from '../../middlewares/checkProductId.mid.js';

const ordersRouter = Router();

ordersRouter.post('/', checkUserId, checkProductId, async (req, res, next) => {
	try {
		const data = await Orders.create(req.body);

		res.json({
			statusCode: 201,
			response: data,
		});
	} catch (e) {
		next(e);
	}
});

ordersRouter.get('/', async (req, res, next) => {
	try {
		const { state, quantity, page, limit } = req.query;

		const filter = {};

		if (state) filter.state = state;
		if (quantity) filter.quantity = quantity;

		const sortAndPaginate = { page, limit };

		if (!page) sortAndPaginate.page = 1;
		if (!limit) sortAndPaginate.limit = 20;

		const orders = await Orders.read({ filter, sortAndPaginate });

		res.json({
			statusCode: 200,
			response: orders,
		});
	} catch (e) {
		next(e);
	}
});

ordersRouter.get('/:userId', checkUserId, async (req, res, next) => {
	try {
		const { userId } = req.params;

		const user = await Orders.read({ filter: { userId } });

		res.json({
			statusCode: 200,
			response: user,
		});
	} catch (e) {
		next(e);
	}
});

ordersRouter.get('/total/:userId', checkUserId, async (req, res, next) => {
	try {
		const { userId } = req.params;

		const user = await Orders.report(userId);

		res.json({
			statusCode: 200,
			response: user,
		});
	} catch (e) {
		next(e);
	}
});

ordersRouter.put('/:orderId', checkOrderId, async (req, res, next) => {
	try {
		const { orderId } = req.params;

		const modifiedOrder = await Products.update(orderId, req.body);

		res.json({
			statusCode: 200,
			response: modifiedOrder,
		});
	} catch (e) {
		next(e);
	}
});

ordersRouter.delete('/:orderId', checkOrderId, async (req, res, next) => {
	try {
		const { orderId } = req.params;

		const deletedOrder = await Orders.destroy(orderId);

		res.json({
			statusCode: 200,
			response: deletedOrder,
		});
	} catch (e) {
		next(e);
	}
});

export default ordersRouter;

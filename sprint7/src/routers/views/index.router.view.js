import { Router } from 'express';

import authRouter from './auth.router.view.js';
import usersRouter from './users.router.view.js';
import productsRouter from './products.router.view.js';
import ordersRouter from './orders.router.view.js';

import { Products } from '../../data/mongo/mongo.manager.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res, next) => {
	try {
		const data = {
			filter: {},
			sortAndPaginate: {},
		};

		data.filter = req.query;

		const { docs } = await Products.read(data);

		return res.render('index', {
			products: docs,
		});
	} catch (e) {
		next(e);
	}
});

viewsRouter.use('/auth', authRouter);
viewsRouter.use('/users', usersRouter);
viewsRouter.use('/products', productsRouter);
viewsRouter.use('/orders', ordersRouter);

export default viewsRouter;

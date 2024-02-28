import { Router } from 'express';

import verifyToken from '../../middlewares/verifyToken.mid.js';

const ordersRouter = Router();

ordersRouter.get('/', verifyToken, (req, res, next) => {
	try {
		return res.render('orders', {
			userId: req._user.id,
		});
	} catch (e) {
		next(e);
	}
});

export default ordersRouter;

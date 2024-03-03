import { Router } from 'express';

import verifyToken from '../../middlewares/verifyToken.mid.js';
import isAdmin from '../../middlewares/isAdmin.mid.js';

const productsRouter = Router();

productsRouter.get('/form', verifyToken, isAdmin, (req, res, next) => {
	try {
		return res.render('form');
	} catch (e) {
		next(e);
	}
});

export default productsRouter;

import CustomRouter from '../customRouter.js';

import isAdmin from '../../middlewares/isAdmin.mid.js';
import { checkProductId } from '../../middlewares/checkProductId.mid.js';

import {
	create,
	read,
	readOne,
	update,
	destroy,
} from '../../controllers/products.controller.js';

class Router extends CustomRouter {
	init() {
		this.create(
			'/',
			['PUBLIC'],
			// isAdmin,
			create
		);

		this.read('/', ['PUBLIC'], read);

		this.read('/:productId', ['PUBLIC'], readOne);

		this.update('/:productId', ['PUBLIC'], update);

		this.destroy(
			'/:productId',
			['PUBLIC'],
			destroy
		);
	}
}

const productsRouter = new Router().getRouter();
export default productsRouter;

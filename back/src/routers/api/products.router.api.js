import CustomRouter from '../customRouter.js';

import addOwner from '../../middlewares/addOwner.mid.js';
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
		this.create('/', ['ADMIN', "PREMIUM"], addOwner, create);

		this.read('/', ['PUBLIC', 'ADMIN', "PREMIUM", 'USER'], read);

		this.read('/:productId', ['PUBLIC', 'ADMIN', "PREMIUM", 'USER'], readOne);

		this.update('/:productId', ['ADMIN', "PREMIUM"], update);

		this.destroy('/:productId', ['ADMIN', "PREMIUM"], destroy);
	}
}

const productsRouter = new Router().getRouter();
export default productsRouter;

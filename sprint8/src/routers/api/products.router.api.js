import CustomRouter from '../customRouter.js';

// import isAdmin from '../../middlewares/isAdmin.mid.js';
// import passportCb from '../../middlewares/passportCb.mid.js';
// import { checkProductId } from '../../middlewares/checkProductId.mid.js';

import {
  create,
  read,
  readOne,
  update,
  destroy,
} from '../../controllers/products.controller.js';

class Router extends CustomRouter {
  init() {
    // this.create(
    //   '/',
    //   ['PUBLIC'],
    //   // passportCb('jwt'),
    //   isAdmin,
    //   create
    // );

    this.read('/', ['PUBLIC'], read);

    // this.read(
    //   '/:productId',
    //   ['PUBLIC'],
    //   //  passportCb('jwt'),
    //   readOne
    // );

    // this.update(
    //   '/:productId',
    //   ['PUBLIC'],
    //   // passportCb('jwt'),
    //   isAdmin,
    //   checkProductId,
    //   update
    // );

    // this.destroy(
    //   '/:productId',
    //   ['PUBLIC'],
    //   // passportCb('jwt'),
    //   isAdmin,
    //   checkProductId,
    //   destroy
    // );
  }
}

const productsRouter = new Router().getRouter();
export default productsRouter;

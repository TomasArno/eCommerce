import CustomRouter from '../customRouter.js';

import authRouter from './auth.router.view.js';
import usersRouter from './users.router.view.js';
import productsRouter from './products.router.view.js';
import ordersRouter from './orders.router.view.js';

import { products } from '../../data/mongo/mongo.manager.js';

class Router extends CustomRouter {
  init() {
    this.get('/', async (req, res, next) => {
      try {
        const data = {
          filter: {},
          sortAndPaginate: {},
        };

        data.filter = req.query;

        const { docs } = await products.read(data);

        return res.render('index', {
          products: docs,
        });
      } catch (e) {
        next(e);
      }
    });

    this.use('/auth', authRouter);
    this.use('/users', usersRouter);
    this.use('/products', productsRouter);
    this.use('/orders', ordersRouter);
  }
}

const viewsRouter = new Router().getRouter();

export default viewsRouter;

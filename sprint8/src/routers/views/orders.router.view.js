import { Router } from 'express';

import { orders } from '../../data/mongo/mongo.manager.js';
import verifyToken from '../../middlewares/verifyToken.mid.js';

const ordersRouter = Router();

ordersRouter.get('/', verifyToken, async (req, res, next) => {
  try {
    const { email } = req._user;

    const userOrders = await orders.read({ filter: { email } });

    return res.render('orders', {
      orders: userOrders,
    });
  } catch (e) {
    next(e);
  }
});

export default ordersRouter;

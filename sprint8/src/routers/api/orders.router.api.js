import { Router } from 'express';

import { orders } from '../../data/mongo/mongo.manager.js';

import passportCb from '../../middlewares/passportCb.mid.js';
import { checkUserId } from '../../middlewares/checkUserId.mid.js';
import { checkOrderId } from '../../middlewares/checkOrderId.mid.js';
import { checkProductId } from '../../middlewares/checkProductId.mid.js';

const ordersRouter = Router();

ordersRouter.post(
  '/',
  passportCb('jwt'),
  checkUserId,
  checkProductId,
  async (req, res, next) => {
    try {
      const data = await orders.create(req.body);

      res.json({
        statusCode: 201,
        response: data,
      });
    } catch (e) {
      next(e);
    }
  }
);

ordersRouter.get('/', passportCb('jwt'), async (req, res, next) => {
  try {
    const { state, quantity, page, limit } = req.query;

    const filter = {};

    if (state) filter.state = state;
    if (quantity) filter.quantity = quantity;

    const sortAndPaginate = { page, limit };

    if (!page) sortAndPaginate.page = 1;
    if (!limit) sortAndPaginate.limit = 20;

    const orders = await orders.read({ filter, sortAndPaginate });

    res.json({
      statusCode: 200,
      response: orders,
    });
  } catch (e) {
    next(e);
  }
});

ordersRouter.get(
  '/:userId',
  passportCb('jwt'),
  checkUserId,
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await orders.read({ filter: { userId } });

      res.json({
        statusCode: 200,
        response: user,
      });
    } catch (e) {
      next(e);
    }
  }
);

ordersRouter.get(
  '/total/:userId',
  passportCb('jwt'),
  checkUserId,
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await orders.report(userId);

      res.json({
        statusCode: 200,
        response: user,
      });
    } catch (e) {
      next(e);
    }
  }
);

ordersRouter.put(
  '/:orderId',
  passportCb('jwt'),
  checkOrderId,
  async (req, res, next) => {
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
  }
);

ordersRouter.delete(
  '/:orderId',
  passportCb('jwt'),
  checkOrderId,
  async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const deletedOrder = await orders.destroy(orderId);

      res.json({
        statusCode: 200,
        response: deletedOrder,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default ordersRouter;

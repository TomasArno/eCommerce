import { Router } from 'express';

import { products } from '../../data/mongo/mongo.manager.js';

import isAdmin from '../../middlewares/isAdmin.mid.js';
import passportCb from '../../middlewares/passportCb.mid.js';
import { checkProductId } from '../../middlewares/checkProductId.mid.js';

const productsRouter = Router();

productsRouter.post('/', passportCb('jwt'), isAdmin, async (req, res, next) => {
  try {
    const data = await products.create(req.body);

    res.json({
      statusCode: 201,
      response: data,
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.get('/', passportCb('jwt'), async (req, res, next) => {
  try {
    const { title, price, stock, page, limit } = req.query;

    const filter = {};

    if (title) filter.title = title;
    if (price) filter.price = price;
    if (stock) filter.stock = stock;

    const sortAndPaginate = { page, limit };

    if (!page) sortAndPaginate.page = 1;
    if (!limit) sortAndPaginate.limit = 20;

    const products = await products.read({ filter, sortAndPaginate });

    res.json({
      statusCode: 200,
      response: products,
    });
  } catch (e) {
    next(e);
  }
});

productsRouter.get(
  '/:productId',
  passportCb('jwt'),
  checkProductId,
  async (req, res, next) => {
    try {
      res.json({
        statusCode: 200,
        response: req._product,
      });
    } catch (e) {
      next(e);
    }
  }
);

productsRouter.put(
  '/:productId',
  passportCb('jwt'),
  isAdmin,
  checkProductId,
  async (req, res, next) => {
    try {
      const { productId } = req.params;

      const modifiedProduct = await products.update(productId, req.body);

      res.json({
        statusCode: 200,
        response: modifiedProduct,
      });
    } catch (e) {
      next(e);
    }
  }
);

productsRouter.delete(
  '/:productId',
  passportCb('jwt'),
  isAdmin,
  checkProductId,
  async (req, res, next) => {
    try {
      const { productId } = req.params;

      const deletedProduct = await products.destroy(productId);

      res.json({
        statusCode: 200,
        response: deletedProduct,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default productsRouter;

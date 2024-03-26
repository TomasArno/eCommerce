import ordersService from "../services/orders.service.js";

class OrdersController {
  constructor() {
    this.service = ordersService;
  }

  async read(req, res, next) {
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
  }

  async create(req, res, next) {
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

  async readOne(req, res, next) {
    async (req, res, next) => {
      try {
        const { userId } = req.params;

        const userOrders = await orders.read({ filter: { userId } });

        res.json({
          statusCode: 200,
          response: userOrders,
        });
      } catch (e) {
        next(e);
      }
    };
  }

  async update(req, res, next) {
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

  async destroy(req, res, next) {
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
}

const ordersController = new OrdersController();

const { create, read, readOne, update, destroy } = ordersController;

export { create, read, readOne, update, destroy };

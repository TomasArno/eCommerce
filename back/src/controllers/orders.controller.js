import orders from "../services/orders.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

class OrdersController {
  constructor() {
    // this.service = orders;
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

  async report(req, res, next) {
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

  async read(req, res, next) {
    try {
      const { _id } = req.user;
      const { state, quantity, page, limit } = req.query;

      const filter = {};

      filter.userId = _id;
      if (state) filter.state = state;
      if (quantity) filter.quantity = quantity;

      const options = { page, limit };

      if (!page) options.page = 1;
      if (!limit) options.limit = 20;

      const userOrders = await orders.read({ filter, options });
      if (!userOrders?.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: userOrders,
      });
    } catch (e) {
      next(e);
    }
  }

  async readOne(req, res, next) {
    try {
      const { id } = req.user;
      const { orderId } = req.params;

      // if (userId = !id) CustomError.new(errors.forbidden)

      const userOrder = await orders.readOne(orderId);
      console.log(userOrder);
      // if (!userOrders?.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: "userOrders",
      });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { orderId } = req.params;

      const modifiedOrder = await orders.update(orderId, req.body);
      if (!modifiedOrder) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: "Updated Order",
      });
    } catch (e) {
      next(e);
    }
  }

  async destroy(req, res, next) {
    try {
      const { orderId } = req.params;

      const deletedOrder = await orders.destroy(orderId);
      if (!deletedOrder) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: "Deleted Order",
      });
    } catch (e) {
      next(e);
    }
  }
}

const ordersController = new OrdersController();

const { create, read, report, readOne, update, destroy } = ordersController;

export { create, read, report, readOne, update, destroy };

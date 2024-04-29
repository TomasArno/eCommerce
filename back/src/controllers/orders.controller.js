import orders from "../services/orders.service.js";
import products from "../services/products.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

class OrdersController {
  constructor() {
    // this.service = orders;
  }

  static async validateProductsOwner(userId, productId) {
    const product = await products.readOne(productId);
    if (!product || product.ownerId.toString() == userId.toString()) CustomError.new(errors.notFound)

    // const productsId = productsData.map(el => el.productId)

    // const filter = {}

    // filter._id = { $in: productsId }
    // filter.ownerId = { $ne: userId }

    // const productsFounded = (await products.read({ filter })).docs
    // const idsInDatabase = productsFounded.map(el => el._id.toString())

    // if (idsInDatabase.length != productsId.length) {
    //   let missingIds = []

    //   productsId.forEach(id => {
    //     if (!idsInDatabase.includes(id)) {
    //       missingIds.push(id)
    //     }
    //   });

    //   CustomError.new({ message: missingIds, statusCode: 404 })
    // }

    // return productsFounded
  }

  async create(req, res, next) {
    try {
      const { role, _id: userId } = req.user
      const { productId } = req.body

      if (role == 1) await OrdersController.validateProductsOwner(userId, productId)

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
      const { state, quantity, page, limit } = req.query;

      const filter = {};

      if (state) filter.state = state;
      if (quantity) filter.quantity = quantity;

      const options = { page, limit };

      if (!page) options.page = 1;
      if (!limit) options.limit = 20;

      const all = await orders.read({ filter, options });
      if (!all.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: all,
      });
    } catch (e) {
      next(e);
    }
  }

  async readOne(req, res, next) {
    try {
      const { userId } = req.params;

      const userOrders = await orders.read({ filter: { userId } });
      if (!userOrders.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: userOrders,
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
      if (!deletedOrder) CustomError.new(errors.notFound)

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

const { create, read, report, readOne, update, destroy } = ordersController;

export { create, read, report, readOne, update, destroy };

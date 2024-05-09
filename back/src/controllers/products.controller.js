import products from "../services/products.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

class ProductsController {
  constructor() {
    this.service = products;
  }

  async create(req, res, next) {
    try {
      const data = await products.create(req.body);

      res.json({
        statusCode: 201,
        response: data,
      });
    } catch (e) {
      next(e);
    }
  }

  async read(req, res, next) {
    try {
      const { title, price, stock, page, limit } = req.query;

      const filter = {};

      if (title) filter.title = title;
      if (price) filter.price = price;
      if (stock) filter.stock = stock;
      if (req.user?.role == 1) filter.ownerId = { $ne: req.user._id }

      const options = { page, limit };

      if (!page) options.page = 1;
      if (!limit) options.limit = 20;

      const all = await products.read({ filter, options });
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
      const { productId } = req.params;

      const product = await products.readOne(productId);
      if (!product || product.ownerId.toString() == req.user?._id.toString()) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: product,
      });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { user } = req;
      const { productId } = req.params;

      const product = await products.readOne(productId)
      if (!product) CustomError.new(errors.notFound)

      if (user.role == 1 && product.ownerId.toString() != user._id.toString()) CustomError.new(errors.unauthorized) // chequear

      const modifiedProduct = await products.update(productId, req.body);
      if (!modifiedProduct) CustomError.new(errors.error)

      res.json({
        statusCode: 200,
        response: modifiedProduct,
      });
    } catch (e) {
      next(e);
    }
  }

  async destroy(req, res, next) {
    try {
      const { user } = req;
      const { productId } = req.params;

      const product = await products.readOne(productId)
      if (!product) CustomError.new(errors.notFound)

      if (user.role == 1 && product.ownerId.toString() != user._id.toString()) CustomError.new(errors.unauthorized) // chequear

      const deletedProduct = await products.destroy(productId);
      if (!deletedProduct) CustomError.new(errors.error)

      res.json({
        statusCode: 200,
        response: deletedProduct,
      });
    } catch (e) {
      next(e);
    }
  }
}

const productsController = new ProductsController();

const { create, read, readOne, update, destroy } = productsController;

export { create, read, readOne, update, destroy };

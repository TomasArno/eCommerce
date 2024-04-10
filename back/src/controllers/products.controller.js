import productsService from "../services/products.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

class ProductsController {
  constructor() {
    this.service = productsService;
  }

  async create(req, res, next) {
    try {
      const data = await productsService.create(req.body);

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

      const sortAndPaginate = { page, limit };

      if (!page) sortAndPaginate.page = 1;
      if (!limit) sortAndPaginate.limit = 20;

      const products = await productsService.read({ filter, sortAndPaginate });
      if (!products.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: products,
      });
    } catch (e) {
      next(e);
    }
  }

  async readOne(req, res, next) {
    try {
      const { productId } = req.params;

      const product = await productsService.readOne(productId);
      if (!product) CustomError.new(errors.notFound)

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
      const { productId } = req.params;

      const modifiedProduct = await productsService.update(productId, req.body);
      if (!modifiedProduct) CustomError.new(errors.notFound)

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
      const { productId } = req.params;

      const deletedProduct = await productsService.destroy(productId);
      if (!deletedProduct) CustomError.new(errors.notFound)


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

import productsService from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = productsService;
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

      console.log(this);
      const products = await productsServiceread({ filter, sortAndPaginate });

      res.json({
        statusCode: 200,
        response: products,
      });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const data = await productsServicecreate(req.body);

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
        res.json({
          statusCode: 200,
          response: req._product,
        });
      } catch (e) {
        next(e);
      }
    };
  }

  async update(req, res, next) {
    try {
      const { productId } = req.params;

      const modifiedProduct = await productsServiceupdate(productId, req.body);

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

      const deletedProduct = await productsServicedestroy(productId);

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

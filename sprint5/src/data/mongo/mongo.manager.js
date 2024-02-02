import UsersModel from "./models/users.model.js";
import ProductsModel from "./models/products.model.js";
import OrdersModel from "./models/orders.model.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);

      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read({ order, filter }) {
    try {
      const all = await this.model.find(filter).sort(order);

      if (!all.length) {
        const error = new Error("There aren't documents");
        error.statusCode = 404;
        throw error;
      }

      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);

      // notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.read({ filter: { email } });
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };

      const one = await this.model.findByIdAndUpdate(id, data, opt);

      // notFoundOne(one);

      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      // notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const Products = new MongoManager(ProductsModel);
const Users = new MongoManager(UsersModel);
const Orders = new MongoManager(OrdersModel);

export { Products, Users, Orders };

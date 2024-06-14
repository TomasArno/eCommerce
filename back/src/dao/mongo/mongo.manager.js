import { Types } from "mongoose";
import { paginate } from "mongoose-paginate-v2";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);

      return one;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, sortAndPaginate }, exclude = {}) {
    try {
      const opt = { ...sortAndPaginate, lean: true, ...exclude };

      const all = await this.model.paginate(filter, opt);

      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }

  async report(userId) {
    try {
      const report = await this.model.aggregate([
        {
          $match: { userId: new Types.ObjectId(userId) },
        },
        {
          $lookup: {
            localField: "productId",
            foreignField: "_id",
            from: "products",
            as: "productId",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$productId", 0] }, "$$ROOT"],
            },
          },
        },
        {
          $set: { subTotal: { $multiply: ["$quantity", "$price"] } },
        },
        { $group: { _id: "$userId", total: { $sum: "$subTotal" } } },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            total: "$total",
          },
        },
      ]);

      if (!report.length) {
        const error = new Error("There aren't documents");
        error.statusCode = 404;

        throw error;
      }

      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const users = await this.read({ filter: { email } });
      const searchedUser = users.docs[0];

      return searchedUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };

      const one = await this.model.findByIdAndUpdate(id, data, opt);

      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);

      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default MongoManager;

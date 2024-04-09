import crypto from "crypto";

import args from "../utils/arguments.utils.js";
const { env } = args;
class OrdersDTO {
  constructor(data) {
    if (env == "test") {
      this._id = crypto.randomBytes(12).toString("hex")
      this.createdAt = new Date();
      this.updatedAt = new Date();
    };

    this.productId = data.productId;
    this.userId = data.userId;
    this.quantity = data.quantity;
    this.state = data.state || 0;
  }
}

export default OrdersDTO;
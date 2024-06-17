import crypto from "crypto";

import args from "../utils/arguments.utils.js";
const { env } = args;

class PaymentsDTO {
  constructor(data) {
    if (env == "test") {
      this._id = crypto.randomBytes(12).toString("hex")
      this.createdAt = new Date();
      this.updatedAt = new Date();
    };

    this.price_data = {
      product_data: {
        name: data.productId.title,
      },
      unit_amount: (data.productId.price * 100),
      currency: "ars",
    }
    this.quantity = data.quantity;
  }
}

export default PaymentsDTO;
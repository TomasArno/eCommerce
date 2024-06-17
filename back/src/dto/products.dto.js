import crypto from "crypto";

import args from "../utils/arguments.utils.js";
const { env } = args;

class ProductsDTO {
  constructor(data) {
    if (env == "test") {
      this._id = crypto.randomBytes(12).toString("hex")
      this.createdAt = new Date();
      this.updatedAt = new Date();
    };

    this.title = data.title;
    this.photo = data.photo || "https://picsum.photos/200/300";
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    this.ownerId = data.ownerId;
  }
}

export default ProductsDTO;
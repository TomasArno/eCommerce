import crypto from "crypto";

import args from "../utils/arguments.utils.js";
const { env } = args;

class SubcategoriesDTO {
  constructor(data) {
    if (env == "test") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    this.name = data.name;
  }
}

export default SubcategoriesDTO;

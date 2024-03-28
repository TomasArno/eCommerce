import crypto from "crypto";
import { createHash } from "../utils/hash.utils.js";

import args from "../utils/arguments.utils.js";
const { env } = args;

class UserDTO {
  constructor(data) {
    if (env == "test") {
      this._id = crypto.randomBytes(12).toString("hex")
      this.createdAt = new Date();
      this.updatedAt = new Date();
    };

    this.name = data.name;
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.photo = data.photo || null;
  }
}

export default UserDTO;
import crypto from "crypto";
import { createHash } from "../utils/hash.utils.js";

class UserDTO {
  constructor(data) {
    if (process.env.PERSISTENTE !== "MONGO") {
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
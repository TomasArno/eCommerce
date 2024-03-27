import crypto from "crypto";

class OrdersDTO {
  constructor(data) {
    if (process.env.PERSISTENTE !== "MONGO") {
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
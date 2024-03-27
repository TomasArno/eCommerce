import crypto from "crypto";

class ProductsDTO {
  constructor(data) {
    if (process.env.PERSISTENTE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex")
      this.createdAt = new Date();
      this.updatedAt = new Date();
    };

    this.title = data.title;
    this.photo = data.photo;
    this.price = data.price;
    this.stock = data.stock || 0;
  }
}

export default ProductsDTO;
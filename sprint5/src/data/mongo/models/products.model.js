import { model, Schema } from "mongoose";

const collection = "products";

const productsSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Products = model(collection, productsSchema);

export default Products;

import { model, Schema, Types } from "mongoose";

const collection = "orders";

const ordersSchema = new Schema(
  {
    productId: { type: Types.ObjectId, required: true, ref: "products" },
    userId: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, required: true },
    state: { type: Number, default: 0, enum: [0, 1, 2] },
  },
  { timestamps: true }
);

const Orders = model(collection, ordersSchema);

export default Orders;

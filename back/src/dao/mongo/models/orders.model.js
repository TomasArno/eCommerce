import { model, Schema, Types } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "orders";

const ordersSchema = new Schema(
  {
    productId: { type: Types.ObjectId, required: true, ref: "products" },
    userId: { type: Types.ObjectId, required: true, ref: "users", index: true },
    quantity: { type: Number, required: true },
    state: { type: Number, default: 0, enum: [0, 1, 2] },
  },
  { timestamps: true }
);

ordersSchema.plugin(moongosePaginate);

ordersSchema.pre("find", function () {
  this.populate("userId", "-password -createdAt -updatedAt -__v");
});

ordersSchema.pre("find", function () {
  this.populate("productId", "-createdAt -updatedAt -__v");
});

const Orders = model(collection, ordersSchema);

export default Orders;

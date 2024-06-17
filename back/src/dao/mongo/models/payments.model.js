import { model, Schema, Types } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "payments";

const paymentsSchema = new Schema(
  {
    productId: { type: Types.ObjectId, required: true, ref: "products" },
    userId: { type: Types.ObjectId, required: true, ref: "users", index: true },
    quantity: { type: Number, required: true },
    state: { type: Number, default: 0, enum: [0, 1, 2] },
  },
  { timestamps: true }
);

paymentsSchema.plugin(moongosePaginate);

paymentsSchema.pre("find", function () {
  this.populate("userId", "-password -verifyCode -createdAt -updatedAt -__v");
});

paymentsSchema.pre("find", function () {
  this.populate("productId", "-createdAt -updatedAt -__v");
});

const Payments = model(collection, paymentsSchema);

export default Payments;

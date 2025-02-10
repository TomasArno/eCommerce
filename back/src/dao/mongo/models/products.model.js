import { model, Schema, Types } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productsSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    photo: { type: String },
    price: { type: Number, required: true, index: true },
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, required: true, default: false, index: true },
    discount: { type: Number, required: true, default: 0, index: true },
    ownerId: { type: Types.ObjectId, required: true, ref: "users" }, // innecesario porque los usuarios no pueden vender
    categoryId: { type: Types.ObjectId, ref: "categories" },
    subcategoryId: { type: Types.ObjectId, ref: "subcategories" },
  },
  { timestamps: true }
);

productsSchema.plugin(moongosePaginate);

productsSchema.pre("find", function () {
  this.populate("ownerId", "-createdAt -updatedAt -__v");
});

const Products = model(collection, productsSchema);

export default Products;

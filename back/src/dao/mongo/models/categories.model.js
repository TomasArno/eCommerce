import { model, Schema } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "categories";

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

categoriesSchema.plugin(moongosePaginate);

const Categories = model(collection, categoriesSchema);

export default Categories;

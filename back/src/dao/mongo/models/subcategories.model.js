import { model, Schema } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "subcategories";

const subcategoriesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

subcategoriesSchema.plugin(moongosePaginate);

const Subcategories = model(collection, subcategoriesSchema);

export default Subcategories;

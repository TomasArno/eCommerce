import { model, Schema } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "users";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(moongosePaginate);

const Users = model(collection, userSchema);

export default Users;

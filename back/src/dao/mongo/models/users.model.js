import { model, Schema } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "users";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    photo: { type: String },
    role: { type: Number, default: 0 },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String },
  },
  { timestamps: true }
);

userSchema.plugin(moongosePaginate);

const Users = model(collection, userSchema);

export default Users;

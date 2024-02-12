import { model, Schema } from "mongoose";

const collection = "users";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = model(collection, userSchema);

export default Users;

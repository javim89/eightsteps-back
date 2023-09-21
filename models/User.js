import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const User = model("User", UserSchema);

export default User;

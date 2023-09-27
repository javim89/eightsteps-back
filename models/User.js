import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  alias: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const User = model("User", UserSchema);

export default User;

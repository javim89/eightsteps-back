import { Schema, model } from "mongoose";

export const UserBotSchema = new Schema({
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
  responseTime: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const UserBot = model("UserBot", UserBotSchema);

export default UserBot;

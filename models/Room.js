import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  isPrivate: Boolean,
  name: String,
  password: String,
  steps: [{
    participants: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    step: Number,
    category: String,
  }],
  watching: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true });

const Room = model("Room", RoomSchema);

export default Room;

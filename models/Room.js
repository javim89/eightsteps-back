import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  isPrivate: Boolean,
  name: String,
  password: String,
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  watching: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true });

const Room = model("Room", RoomSchema);

export default Room;

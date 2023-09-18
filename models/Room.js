import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  isPrivate: Boolean,
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true});

const Room = model("Room", RoomSchema);

export default Room;
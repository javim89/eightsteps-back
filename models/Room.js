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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  }],
  watching: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  status: {
    type: String,
    enum: ["NEW", "PLAYING", "FINISHED"],
    default: "NEW",
  },
}, { timestamps: true });

const Room = model("Room", RoomSchema);

export default Room;

import { Schema, model } from "mongoose";
import { UserStatusEnum, RoomStatusEnum } from "../utils/constants.js";

const RoomSchema = new Schema({
  isPrivate: Boolean,
  name: String,
  password: String,
  steps: [{
    participants: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      bot: {
        type: Schema.Types.ObjectId,
        ref: "UserBot",
      },
      answerOne: {
        type: Boolean,
        required: false,
        default: null,
      },
      isAnswerOneCorrect: {
        type: Boolean,
        required: false,
        default: null,
      },
      answerTwo: {
        type: Number,
        required: false,
        default: null,
      },
      status: {
        type: String,
        enum: [UserStatusEnum.WAITING, UserStatusEnum.ANSWERING],
        default: UserStatusEnum.WAITING,
      },
      showQuestion: Boolean,
    }],
    step: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "QuestionsAndAnswers",
      required: false,
    },
  }],
  watching: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  status: {
    type: String,
    enum: [RoomStatusEnum.WAITING_USERS, RoomStatusEnum.PLAYING, RoomStatusEnum.FINISHED],
    default: RoomStatusEnum.WAITING_USERS,
  },
  currentStep: {
    type: Number,
    default: 7,
  },
}, { timestamps: true });

const Room = model("Room", RoomSchema);

export default Room;

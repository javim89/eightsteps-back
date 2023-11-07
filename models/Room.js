import { Schema, model } from "mongoose";

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
    enum: ["NEW", "PLAYING", "FINISHED"],
    default: "NEW",
  },
  currentStep: Number,
  showQuestion: Boolean,
}, { timestamps: true });

const Room = model("Room", RoomSchema);

export default Room;

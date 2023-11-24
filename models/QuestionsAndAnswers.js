import { Schema, model } from "mongoose";
import { QuestionsTypeEnum } from "../utils/constants.js";

const QuestionsAndAnswersSchema = new Schema({
  question: String,
  answer: Schema.Types.Mixed,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  helperText: {
    type: String,
    required: false,
  },
  // type: Agregar foto, multiplechoice, etc
  type: {
    type: String,
    enum: [QuestionsTypeEnum.BOOLEAN, QuestionsTypeEnum.NUMERIC],
    default: QuestionsTypeEnum.BOOLEAN,
  },
});

const QuestionsAndAnswers = model("QuestionsAndAnswer", QuestionsAndAnswersSchema);

export default QuestionsAndAnswers;

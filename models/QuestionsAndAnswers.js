import { Schema, model } from "mongoose";

const QuestionsAndAnswersSchema = new Schema({
  question: String,
  answer: Boolean,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  helperText: {
    type: String,
    required: false,
  },
  // type: verdadero/false, con foto, multiplechoice, numerica (proximidad), etc
});

const QuestionsAndAnswers = model("QuestionsAndAnswer", QuestionsAndAnswersSchema);

export default QuestionsAndAnswers;

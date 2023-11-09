import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import QuestionsAndAnswers from "../models/QuestionsAndAnswers.js";

const checkAnswer = async (answerId, answer) => {
  if (Types.ObjectId.isValid(answerId)) {
    const result = await QuestionsAndAnswers.findById(answerId);
    return result.answer === answer;
  }
  throw new GraphQLError("Invalid QuestionsAndAnswers ID", {
    extensions: { code: "404" },
  });
};

export default checkAnswer;

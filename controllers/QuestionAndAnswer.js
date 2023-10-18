import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import QuestionsAndAnswers from "../models/QuestionsAndAnswers";

const checkAnswer = async (_, { id, answer }) => {
  if (Types.ObjectId.isValid(id)) {
    const result = QuestionsAndAnswers.findById(id).exec();
    return result.answer === answer;
  }
  throw new GraphQLError("Invalid ID", {
    extensions: { code: "404" },
  });
};

export default checkAnswer;

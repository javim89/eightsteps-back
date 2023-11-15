import { gql } from "apollo-server-express";

const StepTypeDefs = gql`
  type UserWithAnswer {
    user: User,
    bot: Bot,
    answerOne: Boolean,
    isAnswerOneCorrect: Boolean,
    answerTwo: Int,
    status: String,
    showQuestion: Boolean,
  }
  type Step {
    id: ID,
    participants: [UserWithAnswer],
    step: Int,
    category: Category,
    question: Question,
  }
`;

export default StepTypeDefs;

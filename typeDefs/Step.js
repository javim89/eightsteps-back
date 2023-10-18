import { gql } from "apollo-server-express";

const StepTypeDefs = gql`
  type UserWithAnswer {
    user: User,
    answerOne: Boolean,
    isAnswerOneCorrect: Boolean,
    answerTwo: Int
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

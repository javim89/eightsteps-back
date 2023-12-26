import { gql } from "apollo-server-express";

const StepTypeDefs = gql`
  scalar Any

  type Answer {
    answer: Any
    isAnswerCorrect: Boolean
  }
  type UserWithAnswer {
    user: User,
    bot: Bot,
    answers: [Answer],
    status: String,
    showQuestion: Boolean,
  }
  type Step {
    id: ID,
    participants: [UserWithAnswer],
    step: Int,
    category: Category,
    askQuestion: Int,
    questions: [Question],
  }
`;

export default StepTypeDefs;

import { gql } from "apollo-server-express";

const QuestionTypeDefs = gql`
  type Question {
    id: ID,
    question: String,
    helperText: String,
    type: String
  }
`;

export default QuestionTypeDefs;

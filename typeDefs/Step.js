import { gql } from "apollo-server-express";

const StepTypeDefs = gql`
  type Step {
    id: ID,
    participants: [User]
    step: Int,
    category: String
  }
`;

export default StepTypeDefs;

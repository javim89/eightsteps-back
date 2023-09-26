import { gql } from "apollo-server-express";

const CategoryTypeDefs = gql`
  type Category {
    id: ID,
    name: String,
    mainColor: String
  }
`;

export default CategoryTypeDefs;

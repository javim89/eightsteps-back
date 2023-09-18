import { gql } from "apollo-server-express";

const UserTypeDefs = gql`
  type User {
    id: ID,
    name: String,
    surname: String
  }

  type Query {
    getAllUsers: [User],
    getUserById(id:ID): User
  }

  type Mutation {
    createUser(name: String, surname: String): User
  }
`;

export default UserTypeDefs;

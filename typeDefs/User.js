import { gql } from "apollo-server-express";

const UserTypeDefs = gql`
  type JwtToken {
    token: String!
  }

  type User {
    id: ID,
    name: String,
    surname: String
    alias: String
  }

  type Query {
    getAllUsers: [User],
    getUserById(id:ID): User
  }

  type Mutation {
    createUser(alias: String, name: String, surname: String): JwtToken
  }
`;

export default UserTypeDefs;

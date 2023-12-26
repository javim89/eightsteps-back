import { gql } from "apollo-server-express";

const SetCookie = gql`
type Query {
  setCookie: String
}
`;

export default SetCookie;

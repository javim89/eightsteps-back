import { gql } from "apollo-server-express";

const RoomTypeDefs = gql`
  type Room {
    id: ID,
    isPrivate: Boolean,
    name: String,
    participants: [User],
    watching: [User],
  }
  type Query {
    getAllRooms: [Room]
    getRoomById(id: ID): Room
  }
  type Mutation {
    createRoom(isPrivate: Boolean, name: String, password: String): Room
  }
`;

export default RoomTypeDefs;

import { gql } from "apollo-server-express";

const RoomTypeDefs = gql`
  type Room {
    id: ID,
    isPrivate: Boolean,
    name: String,
    steps: [Step],
    watching: [User],
    participants: Int
  }
  type Query {
    getAllRooms: [Room],
    getRoomById(id: ID): Room
  }
  type Mutation {
    createRoom(isPrivate: Boolean, name: String, password: String): Room,
    addParticipantToRoom(id:ID, alias: String): Room
  }
`;

export default RoomTypeDefs;

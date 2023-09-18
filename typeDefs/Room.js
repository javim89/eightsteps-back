import { gql } from "apollo-server-express";

const RoomTypeDefs = gql`
  type Room {
    id: ID,
    isPrivate: Boolean,
    participants: [User],
  }
  type Query {
    getAllRooms: [Room]
    getRoomById(id: ID): Room
  }
  type Mutation {
    createRoom(isPrivate: Boolean): Room
  }
`;

export default RoomTypeDefs;

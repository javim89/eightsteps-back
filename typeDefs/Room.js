import { gql } from "apollo-server-express";

const RoomTypeDefs = gql`
  type Room {
    id: ID,
    isPrivate: Boolean,
    name: String,
    steps: [Step],
    watching: [User],
    participants: Int,
    status: String
  }
  type Query {
    getAllRooms: [Room],
    getUnfilledRoom: [Room],
    getRoomById(id: ID): Room,
  }
  type Mutation {
    createRoom(isPrivate: Boolean, name: String, password: String): Room,
    addParticipantToRoom(id:ID, alias: String): Room
  }
  type Subscription {
    roomSubscription(id: ID): Room
  }
`;

export default RoomTypeDefs;

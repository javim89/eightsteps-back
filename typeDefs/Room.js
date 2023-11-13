import { gql } from "apollo-server-express";

const RoomTypeDefs = gql`
  type Room {
    id: ID,
    isPrivate: Boolean,
    name: String,
    steps: [Step],
    watching: [User],
    participants: Int,
    status: String,
    currentStep: Int,
    showQuestion: Boolean
  }
  type Query {
    getAllRooms: [Room],
    getUnfilledRoom: [Room],
    getRoomById(id: ID): Room,
  }
  type Mutation {
    createRoom(isPrivate: Boolean, name: String, password: String): Room,
    resetAnswersRoom(roomId: ID): Room,
    addParticipantToRoom(id:ID, alias: String): Room
    saveAndCheckAnswer(answer: Boolean, roomId: ID): Boolean
  }
  type Subscription {
    roomSubscription(id: ID): Room
  }
`;

export default RoomTypeDefs;

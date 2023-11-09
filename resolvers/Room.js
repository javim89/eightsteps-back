/* eslint-disable max-len */
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import User from "../models/User.js";
import * as RoomController from "../controllers/Room.js";

const RoomResolvers = {
  Query: {
    getAllRooms: async () => RoomController.getAllRooms(),
    getRoomById: async (_, props) => RoomController.getRoomById(_, props),
    getUnfilledRoom: () => RoomController.getUnfilledRoom(),
  },
  Mutation: {
    createRoom: async (_, args, { user }) => RoomController.createRoom(_, args, { user }),
    checkAndSaveAnswer: async (_, args, context) => RoomController.checkAndSaveAnswer(_, args, context),
    addParticipantToRoom: async (_, args, { pubSub }) => {
      const { id, alias } = args;
      if (Types.ObjectId.isValid(id)) {
        const user = new User({
          alias,
        });
        const newUser = await user.save();
        const room = await Room.findById(id).populate({
          path: "steps",
          populate: [{
            path: "category",
            model: "Category",
          },
          {
            path: "participants",
            populate: [{
              path: "user",
              model: "User",
            }],
          }],
        });
        const participants = room.steps.reduce((prev, current) => prev + current.participants.length, 0);
        (participants >= 8) ? room.watching.push(newUser) : room.steps[7].participants.push({ user: newUser });
        if (room.steps[7].participants.length === 8) {
          room.status = "PLAYING";
          room.currentStep = 8;
          room.showQuestion = true;
        }
        await room.save();
        pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
        return room;
      }
      throw new GraphQLError("Invalid ID", {
        extensions: { code: "404" },
      });
    },
  },
  Subscription: {
    roomSubscription: {
      subscribe: (_, { id }, { pubSub }) => pubSub.asyncIterator(`ROOM_UPDATED_${id}`),
    },
  },
  Room: {
    // eslint-disable-next-line max-len
    participants: (root) => root.steps.reduce((prev, current) => prev + current.participants.length, 0),
  },
};

export default RoomResolvers;

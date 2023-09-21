import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import User from "../models/User.js";

const RoomResolvers = {
  Query: {
    getAllRooms: async () => {
      const rooms = Room.find().populate("participants");
      return rooms;
    },
    getRoomById: async (_, { id }) => {
      if (Types.ObjectId.isValid(id)) {
        return Room.findById(id).populate("participants");
      }
      throw new GraphQLError("Invalid ID", {
        extensions: { code: "404" },
      });
    },
  },
  Mutation: {
    createRoom: async (_, args) => {
      // Default user / alias
      const user = new User({
        name: `javi${Math.floor(Math.random() * 20)}`,
        surname: `mar${Math.floor(Math.random() * 20)}`,
        alias: `javito${Math.floor(Math.random() * 20)}`,
      });
      const newUser = await user.save();
      const room = new Room(args);
      room.participants.push(newUser.id);
      const newRoom = await room.save();
      return newRoom.populate("participants");
    },
  },
};

export default RoomResolvers;

import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import User from "../models/User.js";

const initializeSteps = (userId) => {
  const step = {
    step: 1,
    category: "HISTORIA",
    participants: [userId],
  };
  const step2 = {
    step: 2,
    category: "CULTURA",
  };
  const step3 = {
    step: 3,
    category: "DEPORTES",
  };
  const step4 = {
    step: 4,
    category: "GEOGRAFIA",
  };
  const step5 = {
    step: 5,
    category: "TECNOLOGIA",
  };
  const step6 = {
    step: 6,
    category: "ENTRETENIMIENTO",
  };
  const step7 = {
    step: 7,
    category: "CIENCIA",
  };
  const step8 = {
    step: 8,
    category: "GANADOR",
  };

  return [step, step2, step3, step4, step5, step6, step7, step8];
};

const RoomResolvers = {
  Query: {
    getAllRooms: async () => {
      const rooms = Room.find().populate({
        path: "steps",
        populate: {
          path: "participants",
          model: "User",
        },
      });
      return rooms;
    },
    getRoomById: async (_, { id }) => {
      if (Types.ObjectId.isValid(id)) {
        return Room.findById(id).populate({
          path: "steps",
          populate: {
            path: "participants",
            model: "User",
          },
        });
      }
      throw new GraphQLError("Invalid ID", {
        extensions: { code: "404" },
      });
    },
  },
  Mutation: {
    createRoom: async (_, args) => {
      const user = new User({
        name: `javi${Math.floor(Math.random() * 20)}`,
        surname: `mar${Math.floor(Math.random() * 20)}`,
        alias: `javito${Math.floor(Math.random() * 20)}`,
      });
      const newUser = await user.save();
      const room = new Room(args);
      const steps = initializeSteps(newUser.id);
      steps.map((step) => room.steps.push(step));
      // room.steps.push(steps);
      const newRoom = await room.save();
      return newRoom.populate({
        path: "steps",
        populate: {
          path: "participants",
          model: "User",
        },
      });
    },
  },
};

export default RoomResolvers;

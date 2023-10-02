/* eslint-disable max-len */
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import User from "../models/User.js";
import categories from "../utils/constants.js";
import Category from "../models/Category.js";

const initializeSteps = async (userId) => {
  const historyCategory = await Category.findOne({ name: categories.HISTORY }).exec();
  const cultureCategory = await Category.findOne({ name: categories.CULTURE }).exec();
  const sportCategory = await Category.findOne({ name: categories.SPORTS }).exec();
  const geographyCategory = await Category.findOne({ name: categories.GEOGRAPHY }).exec();
  const technologyCategory = await Category.findOne({ name: categories.TECHNOLOGY }).exec();
  const entertainmentCategory = await Category.findOne({ name: categories.ENTERTAINMENT }).exec();
  const scienceCategory = await Category.findOne({ name: categories.SCIENCE }).exec();
  const winnerCategory = await Category.findOne({ name: categories.WINNER }).exec();

  const step8 = {
    step: 8,
    category: historyCategory,
    participants: [userId],
  };
  const step7 = {
    step: 7,
    category: cultureCategory,
  };
  const step6 = {
    step: 6,
    category: sportCategory,
  };
  const step5 = {
    step: 5,
    category: geographyCategory,
  };
  const step4 = {
    step: 4,
    category: technologyCategory,
  };
  const step3 = {
    step: 3,
    category: entertainmentCategory,
  };
  const step2 = {
    step: 2,
    category: scienceCategory,
  };
  const step1 = {
    step: 1,
    category: winnerCategory,
  };

  return [step1, step2, step3, step4, step5, step6, step7, step8];
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
          populate: [{
            path: "participants",
            model: "User",
          },
          {
            path: "category",
            model: "Category",
          }],
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
      const steps = await initializeSteps(newUser.id);
      steps.map((step) => room.steps.push(step));
      const newRoom = await room.save();
      return newRoom.populate({
        path: "steps",
        populate: {
          path: "participants",
          model: "User",
        },
      });
    },
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
            path: "participants",
            model: "User",
          },
          {
            path: "category",
            model: "Category",
          }],
        });
        const participants = room.steps.reduce((prev, current) => prev + current.participants.length, 0);
        (participants >= 8) ? room.watching.push(newUser) : room.steps[7].participants.push(newUser);
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

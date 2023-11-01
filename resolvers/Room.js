/* eslint-disable max-len */
import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import User from "../models/User.js";
import QuestionsAndAnswers from "../models/QuestionsAndAnswers.js";
import categories from "../utils/constants.js";
import Category from "../models/Category.js";
import * as RoomController from "../controllers/Room.js";

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

const initializeSteps = async (userId) => {
  const historyCategory = await Category.findOne({ name: categories.HISTORY }).exec();
  const historyQuestion = await QuestionsAndAnswers.find({ category: historyCategory }).exec();

  const cultureCategory = await Category.findOne({ name: categories.CULTURE }).exec();
  const cultureQuestion = await QuestionsAndAnswers.find({ category: historyCategory }).exec();

  const sportCategory = await Category.findOne({ name: categories.SPORTS }).exec();
  const sportQuestion = await QuestionsAndAnswers.find({ category: sportCategory }).exec();

  const geographyCategory = await Category.findOne({ name: categories.GEOGRAPHY }).exec();
  const geographyQuestion = await QuestionsAndAnswers.find({ category: geographyCategory }).exec();

  const technologyCategory = await Category.findOne({ name: categories.TECHNOLOGY }).exec();
  const technologyQuestion = await QuestionsAndAnswers.find({ category: technologyCategory }).exec();

  const entertainmentCategory = await Category.findOne({ name: categories.ENTERTAINMENT }).exec();
  const entertainmentQuestion = await QuestionsAndAnswers.find({ category: entertainmentCategory }).exec();

  const scienceCategory = await Category.findOne({ name: categories.SCIENCE }).exec();
  const scienceQuestion = await QuestionsAndAnswers.find({ category: scienceCategory }).exec();

  const winnerCategory = await Category.findOne({ name: categories.WINNER }).exec();

  const step8 = {
    step: 8,
    category: historyCategory,
    participants: [{ user: userId }],
    question: historyQuestion[getRandomInt()],
  };
  const step7 = {
    step: 7,
    category: cultureCategory,
    question: cultureQuestion[getRandomInt()],
  };
  const step6 = {
    step: 6,
    category: sportCategory,
    question: sportQuestion[getRandomInt()],
  };
  const step5 = {
    step: 5,
    category: geographyCategory,
    question: geographyQuestion[getRandomInt()],
  };
  const step4 = {
    step: 4,
    category: technologyCategory,
    question: technologyQuestion[getRandomInt()],
  };
  const step3 = {
    step: 3,
    category: entertainmentCategory,
    question: entertainmentQuestion[getRandomInt()],
  };
  const step2 = {
    step: 2,
    category: scienceCategory,
    question: scienceQuestion[getRandomInt()],
  };
  const step1 = {
    step: 1,
    category: winnerCategory,
  };

  return [step1, step2, step3, step4, step5, step6, step7, step8];
};

const RoomResolvers = {
  Query: {
    getAllRooms: async () => RoomController.getAllRooms(),
    getRoomById: async (_, props) => RoomController.getRoomById(_, props),
    getUnfilledRoom: () => RoomController.getUnfilledRoom(),
  },
  Mutation: {
    createRoom: async (_, args, { user }) => {
      const room = new Room(args);
      const steps = await initializeSteps(user.userId);
      steps.map((step) => room.steps.push(step));
      const newRoom = await room.save();
      return newRoom.populate({
        path: "steps",
        populate: {
          path: "participants",
          populate: {
            path: "user",
            model: "User",
          },
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

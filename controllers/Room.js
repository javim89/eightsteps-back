import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import QuestionsAndAnswers from "../models/QuestionsAndAnswers.js";
import Category from "../models/Category.js";
import checkAnswer from "./QuestionAndAnswer.js";
import { RoomStatusEnum, UserStatusEnum, categories } from "../utils/constants.js";

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

const getAllRooms = async () => {
  const rooms = await Room.find().populate({
    path: "steps",
    populate: {
      path: "participants",
      populate: [{
        path: "user",
        model: "User",
      },
      {
        path: "bot",
        model: "UserBot",
      }],
    },
  });
  return rooms;
};

const getUnfilledRoom = async () => {
  const unfilledRoom = await Room.find({
    status: RoomStatusEnum.WAITING_USERS,
  }).populate({
    path: "steps",
    populate: [
      {
        path: "participants",
        populate: [{
          path: "user",
          model: "User",
        },
        {
          path: "bot",
          model: "UserBot",
        }],
      },
      {
        path: "category",
        model: "Category",
      },
      {
        path: "question",
        model: "QuestionsAndAnswer",
      }],
  });
  return unfilledRoom;
};

const getRoomById = async (_, { id }) => {
  if (Types.ObjectId.isValid(id)) {
    return Room.findById(id).populate({
      path: "steps",
      populate: [
        {
          path: "participants",
          populate: [{
            path: "user",
            model: "User",
          },
          {
            path: "bot",
            model: "UserBot",
          }],
        },
        {
          path: "category",
          model: "Category",
        },
        {
          path: "question",
          model: "QuestionsAndAnswer",
        },
      ],
    });
  }
  throw new GraphQLError("Invalid ID", {
    extensions: { code: "404" },
  });
};

const createRoom = async (_, args, { user }) => {
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
};

const saveAndCheckAnswer = async (_, { answer, roomId }, { user, pubSub }) => {
  const room = await Room.findById(roomId).populate({
    path: "steps",
    populate: [
      {
        path: "participants",
        populate: [{
          path: "user",
          model: "User",
        },
        {
          path: "bot",
          model: "UserBot",
        }],
      },
      {
        path: "category",
        model: "Category",
      },
      {
        path: "question",
        model: "QuestionsAndAnswer",
      },
    ],
  });
  const currentStep = room.steps[room.currentStep];
  const isAnswerCorrect = await checkAnswer(currentStep.question.id, answer);
  const userOnRoom = currentStep.participants.find((cs) => cs.user?.alias === user.alias);
  const areAnswering = currentStep.participants.some((participant) => !participant.answerOne);
  userOnRoom.answerOne = answer;
  userOnRoom.isAnswerOneCorrect = isAnswerCorrect;
  userOnRoom.status = areAnswering ? UserStatusEnum.WAITING : UserStatusEnum.ANSWERING;
  userOnRoom.showQuestion = false;
  await room.save();
  pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
  return isAnswerCorrect;
};

const resetAnswersRoom = async (_, { roomId }) => {
  const room = await Room.findById(roomId);

  room.steps[7].participants.forEach((participant) => {
    const part = participant;
    part.isAnswerOneCorrect = undefined;
    part.answerOne = undefined;
    part.status = UserStatusEnum.ANSWERING;
    part.showQuestion = true;
  });

  await room.save();

  return room;
};

export {
  getAllRooms,
  getRoomById,
  getUnfilledRoom,
  createRoom,
  saveAndCheckAnswer,
  resetAnswersRoom,
};

import { Types } from "mongoose";
import { GraphQLError } from "graphql";
import Room from "../models/Room.js";
import QuestionsAndAnswers from "../models/QuestionsAndAnswers.js";
import Category from "../models/Category.js";
import checkAnswer from "./QuestionAndAnswer.js";
import {
  RoomStatusEnum, UserStatusEnum, QuestionsTypeEnum, categories,
} from "../utils/constants.js";
import checkWinners from "../services/Room.js";
import { resetTimer } from "../utils/timer.js";

function getRandomInt(num) {
  return Math.floor(Math.random() * num);
}

const initializeSteps = async (userId) => {
  const historyCategory = await Category.findOne({ name: categories.HISTORY }).exec();
  const historyBooleanQuestion = await QuestionsAndAnswers.find({ category: historyCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const historyNumericQuestion = await QuestionsAndAnswers.find({ category: historyCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const cultureCategory = await Category.findOne({ name: categories.CULTURE }).exec();
  const cultureBooleanQuestion = await QuestionsAndAnswers.find({ category: cultureCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const cultureNumericQuestion = await QuestionsAndAnswers.find({ category: cultureCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const sportCategory = await Category.findOne({ name: categories.SPORTS }).exec();
  const sportBooleanQuestion = await QuestionsAndAnswers.find({ category: sportCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const sportNumericQuestion = await QuestionsAndAnswers.find({ category: sportCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const geographyCategory = await Category.findOne({ name: categories.GEOGRAPHY }).exec();
  const geographyBooleanQuestion = await QuestionsAndAnswers.find({ category: geographyCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const geographyNumericQuestion = await QuestionsAndAnswers.find({ category: geographyCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const technologyCategory = await Category.findOne({ name: categories.TECHNOLOGY }).exec();
  const technologyBooleanQuestion = await QuestionsAndAnswers.find({ category: technologyCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const technologyNumericQuestion = await QuestionsAndAnswers.find({ category: technologyCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const entertainmentCategory = await Category.findOne({ name: categories.ENTERTAINMENT }).exec();
  const entertainmentBooleanQuestion = await QuestionsAndAnswers.find({ category: entertainmentCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const entertainmentNumericQuestion = await QuestionsAndAnswers.find({ category: entertainmentCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const scienceCategory = await Category.findOne({ name: categories.SCIENCE }).exec();
  const scienceBooleanQuestion = await QuestionsAndAnswers.find({ category: scienceCategory, type: QuestionsTypeEnum.BOOLEAN }).exec();
  const scienceNumericQuestion = await QuestionsAndAnswers.find({ category: scienceCategory, type: QuestionsTypeEnum.NUMERIC }).exec();

  const winnerCategory = await Category.findOne({ name: categories.WINNER }).exec();

  const step8 = {
    step: 8,
    category: historyCategory,
    participants: [{ user: userId }],
    questions: [
      historyBooleanQuestion[getRandomInt(historyBooleanQuestion.length)],
      historyBooleanQuestion[getRandomInt(historyBooleanQuestion.length)],
      historyNumericQuestion[getRandomInt(historyNumericQuestion.length)],
    ],
  };
  const step7 = {
    step: 7,
    category: cultureCategory,
    questions: [
      cultureBooleanQuestion[getRandomInt(cultureBooleanQuestion.length)],
      cultureBooleanQuestion[getRandomInt(cultureBooleanQuestion.length)],
      cultureNumericQuestion[getRandomInt(cultureNumericQuestion.length)],
    ],
  };
  const step6 = {
    step: 6,
    category: sportCategory,
    questions: [
      sportBooleanQuestion[getRandomInt(sportBooleanQuestion.length)],
      sportBooleanQuestion[getRandomInt(sportBooleanQuestion.length)],
      sportNumericQuestion[getRandomInt(sportNumericQuestion.length)],
    ],
  };
  const step5 = {
    step: 5,
    category: geographyCategory,
    questions: [
      geographyBooleanQuestion[getRandomInt(geographyBooleanQuestion.length)],
      geographyBooleanQuestion[getRandomInt(geographyBooleanQuestion.length)],
      geographyNumericQuestion[getRandomInt(geographyNumericQuestion.length)],
    ],
  };
  const step4 = {
    step: 4,
    category: technologyCategory,
    questions: [
      technologyBooleanQuestion[getRandomInt(technologyBooleanQuestion.length)],
      technologyBooleanQuestion[getRandomInt(technologyBooleanQuestion.length)],
      technologyNumericQuestion[getRandomInt(technologyNumericQuestion.length)],
    ],
  };
  const step3 = {
    step: 3,
    category: entertainmentCategory,
    questions: [
      entertainmentBooleanQuestion[getRandomInt(entertainmentBooleanQuestion.length)],
      entertainmentBooleanQuestion[getRandomInt(entertainmentBooleanQuestion.length)],
      entertainmentNumericQuestion[getRandomInt(entertainmentNumericQuestion.length)],
    ],
  };
  const step2 = {
    step: 2,
    category: scienceCategory,
    questions: [
      scienceBooleanQuestion[getRandomInt(scienceBooleanQuestion.length)],
      scienceBooleanQuestion[getRandomInt(scienceBooleanQuestion.length)],
      scienceNumericQuestion[getRandomInt(scienceNumericQuestion.length)],
    ],
  };
  const step1 = {
    step: 1,
    category: winnerCategory,
    questions: [
      historyBooleanQuestion[getRandomInt(historyBooleanQuestion.length)],
      cultureBooleanQuestion[getRandomInt(cultureBooleanQuestion.length)],
      sportBooleanQuestion[getRandomInt(sportBooleanQuestion.length)],
      geographyBooleanQuestion[getRandomInt(geographyBooleanQuestion.length)],
      technologyBooleanQuestion[getRandomInt(technologyBooleanQuestion.length)],
      entertainmentBooleanQuestion[getRandomInt(entertainmentBooleanQuestion.length)],
      scienceNumericQuestion[getRandomInt(scienceNumericQuestion.length)],
    ],
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
        path: "questions",
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
          path: "questions",
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
        path: "questions",
        model: "QuestionsAndAnswer",
      },
    ],
  });
  const currentStep = room.steps[room.currentStep];
  const { askQuestion } = currentStep;
  const isAnswerCorrect = await checkAnswer(currentStep.questions[askQuestion].id, answer);
  const userOnStep = currentStep.participants.find((cs) => cs.user?.alias === user.alias);
  const { type } = currentStep.questions[askQuestion];
  if (type === QuestionsTypeEnum.BOOLEAN) {
    userOnStep.answers[askQuestion] = {
      answer,
      isAnswerCorrect,
    };
  } else {
    userOnStep.answers[askQuestion] = {
      answer,
    };
  }
  const areAnswering = currentStep.participants.some((participant) => participant.answers[askQuestion] === undefined);
  userOnStep.showQuestion = false;
  pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
  if (areAnswering) {
    userOnStep.status = UserStatusEnum.WAITING;
  } else {
    checkWinners(currentStep, room);
    resetTimer(pubSub, room.id);
    if (currentStep.askQuestion !== currentStep.questions.length) currentStep.askQuestion += 1;
  }

  await room.save();
  pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
  return isAnswerCorrect;
};

const resetAnswersRoom = async (_, { roomId }, { pubSub }) => {
  const room = await Room.findById(roomId);
  room.steps[0].participants = [];
  room.steps[1].participants = [];
  room.steps[2].participants = [];
  room.steps[3].participants = [];
  room.steps[4].participants = [];
  room.steps[5].participants = [];
  room.steps[6].participants = [];
  room.steps[7].participants.forEach((participant) => {
    const part = participant;
    part.answers = [];
    part.status = UserStatusEnum.ANSWERING;
    part.showQuestion = true;
  });
  resetTimer(pubSub, roomId);
  room.steps[7].askQuestion = 0;
  room.currentStep = 7;
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

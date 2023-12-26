import { RoomStatusEnum, UserStatusEnum, QuestionsTypeEnum } from "../utils/constants.js";
import Room from "../models/Room.js";
import checkWinners from "../services/Room.js";

const getRandomAnswer = () => Math.random() < 0.5;

const getRandomInt = () => Math.floor(Math.random() * 600);

async function answerQuestionBot(bot, pubSub) {
  Room.find({
    status: RoomStatusEnum.PLAYING,
    "steps.participants": {
      $elemMatch: {
        bot: {
          _id: bot.id,
        },
        status: UserStatusEnum.ANSWERING,
      },
    },
  })
    .populate({
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
    })
    .exec()
    .then((rooms) => {
      rooms.forEach((room) => {
        const currentStep = room.steps[room.currentStep];
        const botOnStep = currentStep.participants.find((cs) => cs.bot?.id === bot.id);
        const { askQuestion } = currentStep;
        if (botOnStep) {
          const { type } = currentStep.questions[askQuestion];
          if (type === QuestionsTypeEnum.BOOLEAN) {
            const isAnswerCorrect = getRandomAnswer();
            botOnStep.answers[askQuestion] = {
              isAnswerCorrect,
            };
          } else {
            botOnStep.answers[askQuestion] = {
              answer: getRandomInt(),
            };
          }
          const areAnswering = currentStep.participants.some((participant) => participant.answers[askQuestion] === undefined);
          if (areAnswering) {
            botOnStep.status = UserStatusEnum.WAITING;
          } else {
            checkWinners(currentStep, room);
            if (currentStep.askQuestion !== currentStep.questions.length) currentStep.askQuestion += 1;
            currentStep.participants.forEach((part) => {
              const par = part;
              par.status = UserStatusEnum.ANSWERING;
              par.showQuestion = true;
            });
          }
          botOnStep.showQuestion = !areAnswering;
          room.save();
          pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
        }
      });
    });
}

export default answerQuestionBot;

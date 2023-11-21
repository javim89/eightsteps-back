import { RoomStatusEnum, UserStatusEnum } from "../utils/constants.js";
import Room from "../models/Room.js";

const getRandomAnswer = () => Math.random() < 0.5;

async function answerQuestionBot(bot, pubSub) {
  Room.find({
    status: RoomStatusEnum.PLAYING,
    "steps.participants": {
      $elemMatch: {
        isAnswerOneCorrect: null,
        bot: {
          _id: bot.id,
        },
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
          path: "question",
          model: "QuestionsAndAnswer",
        },
      ],
    })
    .exec()
    .then((rooms) => {
      rooms.forEach((room) => {
        const currentStep = room.steps[room.currentStep];
        const botOnRoom = currentStep.participants.find((cs) => cs.bot?.id === bot.id);
        botOnRoom.isAnswerOneCorrect = false;
        const areAnswering = currentStep.participants.some((participant) => participant.isAnswerOneCorrect === null);
        if (areAnswering) {
          botOnRoom.status = UserStatusEnum.WAITING;
        } else {
          const participantAnswerCorrect = currentStep.participants.filter((part) => part.isAnswerOneCorrect);
          if (participantAnswerCorrect.length === 1) {
            participantAnswerCorrect[0].status = UserStatusEnum.WINNER;
            room.steps[room.currentStep - 1].participants.push({ user: participantAnswerCorrect[0].user });
          }
        }
        botOnRoom.showQuestion = false;
        room.save();
        pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
      });
    });
}

export default answerQuestionBot;

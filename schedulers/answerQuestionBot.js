/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Room from "../models/Room.js";

const getRandomAnswer = () => Math.random() < 0.5;

async function answerQuestionBot(bot, pubSub) {
  Room.find({
    status: "PLAYING",
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
        const currentStep = room.steps[room.currentStep - 1];
        const botOnRoom = currentStep.participants.find((cs) => cs.bot?.id === bot.id);
        botOnRoom.isAnswerOneCorrect = getRandomAnswer();
        room.save();
        pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
      });
    });
}

export default answerQuestionBot;

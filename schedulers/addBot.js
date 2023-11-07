/* eslint-disable no-param-reassign */
import { getUnfilledRoom } from "../controllers/Room.js";
import UserBot from "../models/UserBot.js";

async function addBot(pubSub) {
  const unfilledRooms = await getUnfilledRoom();

  unfilledRooms.forEach(async (room) => {
    const { participants } = room.steps[7];
    const botsParticipants = participants.filter((participant) => participant.bot);

    const userBot = await UserBot.findOne({
      _id: {
        $nin: botsParticipants.map((bot) => bot.bot.id),
      },
    }).exec();
    room.steps[7].participants.push({ bot: userBot });
    if (room.steps[7].participants.length === 8) {
      room.status = "PLAYING";
      room.currentStep = 8;
      room.showQuestion = true;
    }
    await room.save();
    pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
  });
}

export default addBot;

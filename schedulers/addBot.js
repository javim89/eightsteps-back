/* eslint-disable no-param-reassign */
import { getUnfilledRoom } from "../controllers/Room.js";
import UserBot from "../models/UserBot.js";

async function addBot(pubSub) {
  const unfilledRooms = await getUnfilledRoom();

  unfilledRooms.forEach(async (room) => {
    const { participants } = room.steps[7];
    const bots = participants.filter((participant) => participant.bot);
    // Get the count of all users
    const botsAvailable = await UserBot.count({
      id: {
        $nin: bots.filter((bot) => bot.id),
      },
    }).exec();

    const random = Math.floor(Math.random() * botsAvailable);

    // Again query all users but only fetch one offset by our random #
    const userBot = await UserBot.findOne().skip(random).exec();
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

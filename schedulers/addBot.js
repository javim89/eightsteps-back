/* eslint-disable no-param-reassign */
import { RoomStatusEnum, UserStatusEnum } from "../utils/constants.js";
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
      room.status = RoomStatusEnum.PLAYING;
      room.currentStep = 7;
      room.steps[7].participants.forEach((participant) => {
        const part = participant;
        part.showQuestion = true;
        part.status = UserStatusEnum.ANSWERING;
      });
    }
    await room.save();
    pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
  });
}

export default addBot;

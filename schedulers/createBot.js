import axios from "axios";
import { getUnfilledRoom } from "../controllers/Room.js";
import User from "../models/User.js";

async function createBot(pubSub) {
  const unfilledRooms = await getUnfilledRoom();

  unfilledRooms.forEach(async (room) => {
    const response = await axios("https://api.generadordni.es/v2/profiles/person");
    const { name, surname, username } = response.data[0];
    const user = new User({
      name,
      surname,
      alias: username,
    });
    const newUser = await user.save();
    room.steps[7].participants.push(newUser);
    if (room.steps[7].participants.length === 8) {
      // eslint-disable-next-line no-param-reassign
      room.status = "PLAYING";
    }
    await room.save();
    pubSub.publish(`ROOM_UPDATED_${room.id}`, { roomSubscription: room });
  });
}

export default createBot;

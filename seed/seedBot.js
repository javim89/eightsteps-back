import axios from "axios";
import UserBot from "../models/UserBot.js";

export default async function seedUserBot() {
  const bots = await UserBot.find();
  const botsToSave = [];
  if (bots.length === 0) {
    for (let i = 0; i < 7; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios("https://api.generadordni.es/v2/profiles/person");
      const { name, surname, username } = response.data[0];
      const userBot = new UserBot({
        name,
        surname,
        alias: username,
      });
      botsToSave.push(userBot.save());
    }
  }
  await Promise.all(botsToSave);
}

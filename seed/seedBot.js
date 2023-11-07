import axios from "axios";
import UserBot from "../models/UserBot.js";

const generateRandomNumber = () => Math.floor(Math.random() * 20) + 1;

export default async function seedUserBot() {
  const bots = await UserBot.find();
  const botsToSave = [];
  if (bots.length === 0) {
    for (let i = 0; i < 7; i += 1) {
      axios.get("https://api.generadordni.es/v2/profiles/person").then((response) => {
        const { name, surname, username } = response.data[0];
        const userBot = new UserBot({
          name,
          surname,
          alias: username,
          responseTime: generateRandomNumber(),
        });
        botsToSave.push(userBot.save());
      });
    }
  }
  await Promise.all(botsToSave);
}

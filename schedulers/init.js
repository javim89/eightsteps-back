/* eslint-disable no-new */
import { CronJob } from "cron";
import addBot from "./addBot.js";
import answerQuestionBot from "./answerQuestionBot.js";
import UserBot from "../models/UserBot.js";

export default function startSchedulers(pubSub) {
  new CronJob(
    "*/5 * * * * *",
    (() => {
      addBot(pubSub);
    }),
    null,
    true,
    "America/Los_Angeles",
  );

  UserBot.find().then((res) => {
    res.forEach((bot) => {
      new CronJob(
        `*/${bot.responseTime} * * * * *`,
        (() => {
          answerQuestionBot(bot, pubSub);
        }),
        null,
        true,
        "America/Los_Angeles",
      );
    });
  });
}

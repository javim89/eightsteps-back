/* eslint-disable no-new */
import { CronJob } from "cron";
import createBot from "./createBot.js";

export default function startSchedulers(pubSub) {
  new CronJob(
    "*/5 * * * * *",
    (() => {
      createBot(pubSub);
    }),
    null,
    true,
    "America/Los_Angeles",
  );
}

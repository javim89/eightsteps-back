/* eslint-disable no-new */
import { CronJob } from "cron";
import addBot from "./addBot.js";

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
}

import { logManager } from "../log-manager.module";

const cron = require("cron");

const logger = logManager("frameworkNoSleep");

export const frameworkNoSleep = () => {
  const job = new cron.CronJob("*/14 * * * *", function () {
    logger.info("No sleep cron job");

    // Do something
    const a = 1;
    const b = 2;

    const result = a + b;

    logger.info("No sleep cron job result", result);
  });

  job.start();
};

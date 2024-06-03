/**
 * Setup the tslog logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */
import env from "@config/env";
import { Logger } from "tslog";

const level = (() => {
  // 0: silly, 1: trace, 2: debug, 3: info, 4: warn, 5: error, 6: fatal
  switch (env.LOG_LEVEL) {
    case "error":
      return 6;
    case "warn":
      return 5;
    case "info":
      return 4;
    case "debug":
      return 3;
    default:
      return 3;
  }
})();

export const logger = new Logger({
  name: "notification-dashboard",
  minLevel: level,
});

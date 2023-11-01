import logger, { pino } from "pino";
import path from "path";

const file = path.join(process.cwd(), "logs", "app.log");

const transport = pino.transport({
  targets: [
    { target: "pino/file", level: "info", options: { destination: file } },
    {
      target: "pino-pretty",
      level: "debug",
      options: { colorize: true, translateTime: "SYS:standard" },
    },
  ],
});
const log = logger(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport
);

export default log;

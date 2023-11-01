import logger, { pino } from "pino";
import path from "path";

const file = path.join(process.cwd(), "logs", "app.log");
const log = logger({
  transport: {
    targets: [
      { target: "pino/file", level: "info", options: { destination: file } },
      {
        target: "pino-pretty",
        level: "debug",
        options: { colorize: true, translateTime: "SYS:standard" },
      },
    ],
  },
  base: {
    pid: false,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default log;

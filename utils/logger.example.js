// import winston from "winston";
// import { createLogger, transports, format } from "winston";
// import { logger } from "express-winston";

const log = logger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "info.log" }),
  ],
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.prettyPrint(),
    format.colorize(),
    format.splat()
  ),
  statusLevels: true,
});

const customFormatter = format.printf((level, meta, timestamp) => {
  return `${level} ${timestamp} %{meta.message}`;
});

export { customFormatter };
export default log;
//--------------------------------------------------------------

// import { createLogger, format, transports } from "winston";
// import { logger } from "express-winston";

// const log = logger({
//   level: process.env.NODE_ENV === "production" ? "info" : "debug",
//   format: format.combine(
//     format.timestamp({
//       format: "YYYY-MM-DD HH:mm:ss",
//     }),
//     format.errors({ stack: true }),
//     format.splat(),
//     format.colorize(),
//     // format.prettyPrint(),
//     format.json()
//   ),
//   defaultMeta: { service: "fiverr" },
//   transports: [
//     new transports.File({ filename: "testing-debug.log", level: "error" }),
//     new transports.File({ filename: "testing.log" }),
//   ],
// });

// // if (process.env.Node_ENV !== "production") {
// //   log.add(
// //     new transports.Console({
// //       format: format.combine(format.colorize(), format.simple()),
// //     })
// //   );
// // }

// export default log;

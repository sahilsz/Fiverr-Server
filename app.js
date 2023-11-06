import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import PinoHttp from "pino-http";

import logger from "./utils/logger.js";

// Route Import
import gigRoute from "./routes/gig.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";

const app = express();

// Middlewares
// app.use(cors({ origin: ["*"], credentials: true }));
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://127.0.0.1:9999",
      "*",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(PinoHttp({ logger }));

// Routes
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/c", conversationRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

// Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  logger.error(err);
  console.log(err);

  return res.status(errorStatus).send(errorMessage);
});

export default app;

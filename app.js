import express from "express";
import cookieParser from "cookie-parser";

// Route Import
import gigRoute from "./routes/gig.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
// import winston, { transports, format } from "winston";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", conversationRoute);
app.use("/api/conversations", messageRoute);
app.use("/api/messages", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

// Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(err);

  return res.status(errorStatus).send(errorMessage);
});

export default app;

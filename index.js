import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8800;
const user = process.env.MONGO_USERNAME || "admin";
const pwd = process.env.MONGO_PASSWORD;
const m_port = process.env.MONGO_PORT || "localhost";
const m_host = process.env.MONGO_HOST || 27017;
const m_db = process.env.MONGO_DB || "fiverr";

const connect = async function () {
  try {
    await mongoose.connect(
      `mongodb://${user}:${pwd}@${m_host}:${m_port}/${m_db}?authSource=admin`
    );
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
};

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);

app.listen(port, () => {
  connect();
  console.log("Backend Server is running!");
});

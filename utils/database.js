import mongoose from "mongoose";
import log from "./logger.js";

async function connectDB() {
  const dbURI = process.env.DB_URI;
  try {
    await mongoose.connect(dbURI);
    log.info(`DB Connected`);
  } catch (error) {
    log.error(error);
  }
}

export default connectDB;

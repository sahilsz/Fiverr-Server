import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import app from "./app.js";
import logger from "./utils/logger.js";

dotenv.config();

const port = process.env.PORT || 8800;

app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port}`);
  connectDB();
});

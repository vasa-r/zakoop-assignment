import mongoose from "mongoose";
import logger from "../logger/logger";
import { envConfig } from "./env-config";

const connectDb = async () => {
  try {
    await mongoose.connect(envConfig.mongo.url || "");
    logger.info("Db connection is success");
  } catch (error) {
    logger.warn("Db connection fail");
    logger.error(error);
    process.exit(1);
  }
};

export default connectDb;

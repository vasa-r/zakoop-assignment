import express from "express";
import "dotenv/config";
import morgan from "morgan";
import logger, { stream } from "./logger/logger";
import applySecurity from "./middleware/security-headers";
import { envConfig } from "./config/env-config";
import { statusCode } from "./types/types";
import { successRes } from "./utils/response-format";
import v1 from "./routes/v1-route";
import errorHandler from "./middleware/error-handler";
import connectDb from "./config/db";

const app = express();
const PORT = 8000;

const initServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      logger.info(`Server is up and running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Error starting server.");
    process.exit(1);
  }
};

app.use(applySecurity);
app.use(express.json());
app.use(
  morgan(envConfig.server.env === "development" ? "dev" : "combined", {
    stream,
  })
);

app.get("/", (_, res) => {
  res.status(statusCode.OK).json(successRes("Good to go chief."));
});

app.use("/api/v1", v1);

app.use((req, res) => {
  res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: `Endpoint not found - ${req.originalUrl}`,
  });
});

app.use(errorHandler);

initServer();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = void 0;
const winston_1 = __importDefault(require("winston"));
const env_config_1 = require("../config/env-config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
// colors for each levels
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
};
// linking colors to each levels in winston
winston_1.default.addColors(colors);
// format for console outputs
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp}< >${info.level}: ${info.message}`));
// format for file output (logs with JSON format)
const fileFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.json());
// show logs based on node environment
const level = () => {
    const env = env_config_1.envConfig.server.env || "development";
    return env === "development" ? "debug" : "info";
};
// defining logger directory and files
const logDir = "logs";
const errorLogs = path_1.default.join(logDir, "error-logs.log");
const combinedLogs = path_1.default.join(logDir, "combined-logs.log");
// create log directory if it doesn't exists
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
// actual logger instance
const logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format: fileFormat,
    transports: [
        new winston_1.default.transports.File({ filename: errorLogs, level: "error" }),
        new winston_1.default.transports.File({ filename: combinedLogs }),
    ],
});
if (env_config_1.envConfig.server.env !== "production") {
    logger.add(new winston_1.default.transports.Console({ format: consoleFormat }));
}
// stream for morgan middleware
exports.stream = {
    write: (message) => {
        logger.http(message.trim());
    },
};
exports.default = logger;

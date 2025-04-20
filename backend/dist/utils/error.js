"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
const logger_1 = __importDefault(require("../logger/logger"));
class AppError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
const handleError = (error) => {
    if (error instanceof AppError && error.isOperational) {
        return {
            success: false,
            statusCode: error.statusCode,
            message: error.message,
        };
    }
    logger_1.default.error(error);
    return {
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
    };
};
exports.handleError = handleError;

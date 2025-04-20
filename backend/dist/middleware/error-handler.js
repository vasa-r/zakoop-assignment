"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger/logger"));
const error_1 = require("../utils/error");
const response_format_1 = require("../utils/response-format");
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(err.stack || err.message);
    const errDetails = (0, error_1.handleError)(err);
    res.status(errDetails.statusCode).json((0, response_format_1.errorRes)(errDetails.message));
};
exports.default = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
require("dotenv/config");
const getEnv = (key, defaultValue) => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};
exports.getEnv = getEnv;

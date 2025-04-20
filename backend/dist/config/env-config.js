"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
require("dotenv/config");
const get_env_1 = require("../utils/get-env");
exports.envConfig = {
    server: {
        port: (0, get_env_1.getEnv)("PORT", "8000"),
        env: (0, get_env_1.getEnv)("NODE_ENV", "production"),
        allowedOrigins: (0, get_env_1.getEnv)("ALLOWED_ORIGINS", "http://localhost:5173"),
    },
    mongo: {
        url: (0, get_env_1.getEnv)("MONGO_URI"),
    },
    client: {
        url: (0, get_env_1.getEnv)("FRONTEND_URL"),
    },
};

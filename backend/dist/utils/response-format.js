"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRes = exports.successRes = void 0;
const env_config_1 = require("../config/env-config");
const successRes = (message, data) => ({
    success: true,
    message,
    data,
});
exports.successRes = successRes;
const errorRes = (message = "Error occurred during process", error) => (Object.assign({ success: false, message }, (env_config_1.envConfig.server.env === "development" && { error })));
exports.errorRes = errorRes;

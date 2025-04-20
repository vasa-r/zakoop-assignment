"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importStar(require("./logger/logger"));
const security_headers_1 = __importDefault(require("./middleware/security-headers"));
const env_config_1 = require("./config/env-config");
const types_1 = require("./types/types");
const response_format_1 = require("./utils/response-format");
const v1_route_1 = __importDefault(require("./routes/v1-route"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const PORT = 8000;
const initServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        app.listen(PORT, () => {
            logger_1.default.info(`Server is up and running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error("Error starting server.");
        process.exit(1);
    }
});
app.use(security_headers_1.default);
app.use(express_1.default.json());
app.use((0, morgan_1.default)(env_config_1.envConfig.server.env === "development" ? "dev" : "combined", {
    stream: logger_1.stream,
}));
app.get("/", (_, res) => {
    res.status(types_1.statusCode.OK).json((0, response_format_1.successRes)("Good to go chief."));
});
app.use("/api/v1", v1_route_1.default);
app.use((req, res) => {
    res.status(types_1.statusCode.NOT_FOUND).json({
        success: false,
        message: `Endpoint not found - ${req.originalUrl}`,
    });
});
app.use(error_handler_1.default);
initServer();

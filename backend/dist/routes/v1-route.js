"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_route_1 = __importDefault(require("./store-route"));
const product_route_1 = __importDefault(require("./product-route"));
const order_route_1 = __importDefault(require("./order-route"));
const v1 = (0, express_1.Router)();
v1.use("/store", store_route_1.default);
v1.use("/product", product_route_1.default);
v1.use("/order", order_route_1.default);
exports.default = v1;

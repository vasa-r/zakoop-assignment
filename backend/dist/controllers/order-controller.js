"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const types_1 = require("../types/types");
const response_format_1 = require("../utils/response-format");
const order_service_1 = require("../services/order-service");
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store, username, products, totalPrice } = req.body;
                const result = yield order_service_1.OrderService.createOrder(store, username, products, totalPrice);
                res
                    .status(types_1.statusCode.CREATED)
                    .json((0, response_format_1.successRes)("Order created successfully", result));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.OrderController = OrderController;

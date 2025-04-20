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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_schema_1 = __importDefault(require("../models/order-schema"));
const types_1 = require("../types/types");
const error_1 = require("../utils/error");
class OrderService {
    static createOrder(store, username, products, totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.order.create({
                    store,
                    username,
                    products,
                    totalPrice,
                });
                return order;
            }
            catch (error) {
                console.log(error);
                if (error instanceof error_1.AppError) {
                    throw error;
                }
                throw new error_1.AppError(types_1.statusCode.SERVER_ERROR, "Something went wrong while creating order");
            }
        });
    }
}
exports.OrderService = OrderService;
OrderService.order = order_schema_1.default;

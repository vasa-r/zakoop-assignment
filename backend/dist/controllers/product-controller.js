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
exports.ProductController = void 0;
const types_1 = require("../types/types");
const response_format_1 = require("../utils/response-format");
const product_service_1 = require("../services/product-service");
class ProductController {
    static addStore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, quantity, storeName, image } = req.body;
                const result = yield product_service_1.ProductService.addProduct(name, price, quantity, storeName, image);
                res
                    .status(types_1.statusCode.CREATED)
                    .json((0, response_format_1.successRes)("Product added successfully"));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = req.query.storeId;
                const page = +req.query.page;
                const result = yield product_service_1.ProductService.getProducts(storeId, page);
                res
                    .status(types_1.statusCode.CREATED)
                    .json((0, response_format_1.successRes)("Products fetched successfully", result));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;

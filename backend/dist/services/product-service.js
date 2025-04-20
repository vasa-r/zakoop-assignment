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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("../models/product-model"));
const store_model_1 = __importDefault(require("../models/store-model"));
const types_1 = require("../types/types");
const error_1 = require("../utils/error");
class ProductService {
    static addProduct(name, price, quantity, storeName, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.product.create({
                    name,
                    price,
                    quantity,
                    storeName,
                    image,
                });
                return product;
            }
            catch (error) {
                if (error instanceof error_1.AppError) {
                    throw error;
                }
                throw new error_1.AppError(types_1.statusCode.SERVER_ERROR, "Something went wrong while adding product");
            }
        });
    }
    static getProducts(storeId_1) {
        return __awaiter(this, arguments, void 0, function* (storeId, page = 1, limit = 10) {
            try {
                const storeDetails = yield this.store.findOne({ _id: storeId }).lean();
                if (!storeDetails) {
                    throw new error_1.AppError(types_1.statusCode.NOT_FOUND, "No store found");
                }
                const totalProducts = yield this.product.countDocuments({
                    storeName: storeDetails.name,
                });
                if (totalProducts === 0) {
                    return {
                        store: storeDetails,
                        products: [],
                        meta: {
                            totalProducts: 0,
                            totalPages: 0,
                            currentPage: page,
                        },
                    };
                }
                const totalPages = Math.ceil(totalProducts / limit);
                const skip = (page - 1) * limit;
                const products = yield this.product
                    .find({ storeName: storeDetails.name })
                    .skip(skip)
                    .limit(limit)
                    .lean();
                if (products.length === 0) {
                    throw new error_1.AppError(types_1.statusCode.NOT_FOUND, "No Products found");
                }
                return {
                    store: storeDetails,
                    products,
                    meta: {
                        totalPages,
                        totalProducts,
                        currentPage: page,
                    },
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof error_1.AppError) {
                    throw error;
                }
                throw new error_1.AppError(types_1.statusCode.SERVER_ERROR, "Something went wrong while getting products");
            }
        });
    }
}
exports.ProductService = ProductService;
ProductService.product = product_model_1.default;
ProductService.store = store_model_1.default;

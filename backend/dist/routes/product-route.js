"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product-controller");
const productRouter = (0, express_1.Router)();
productRouter.post("/create", product_controller_1.ProductController.addStore);
productRouter.get("/", product_controller_1.ProductController.getProducts);
exports.default = productRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_controller_1 = require("../controllers/store-controller");
const storeRouter = (0, express_1.Router)();
storeRouter.post("/create", store_controller_1.StoreController.addStore);
storeRouter.get("/", store_controller_1.StoreController.getStores);
exports.default = storeRouter;

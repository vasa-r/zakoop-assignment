import { Router } from "express";
import storeRouter from "./store-route";
import productRouter from "./product-route";
import orderRouter from "./order-route";

const v1 = Router();

v1.use("/store", storeRouter);
v1.use("/product", productRouter);
v1.use("/order", orderRouter);

export default v1;

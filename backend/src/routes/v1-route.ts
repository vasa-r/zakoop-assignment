import { Router } from "express";
import storeRouter from "./store-route";
import productRouter from "./product-route";

const v1 = Router();

v1.use("/store", storeRouter);
v1.use("/product", productRouter);

export default v1;

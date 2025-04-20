import { Router } from "express";
import { OrderController } from "../controllers/order-controller";

const orderRouter = Router();

orderRouter.post("/create", OrderController.createOrder);

export default orderRouter;

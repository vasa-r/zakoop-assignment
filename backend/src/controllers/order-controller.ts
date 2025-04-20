import { Request, Response, NextFunction } from "express";
import { statusCode } from "../types/types";
import { successRes } from "../utils/response-format";
import { OrderService } from "../services/order-service";

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { store, username, products, totalPrice } = req.body;
      const result = await OrderService.createOrder(
        store,
        username,
        products,
        totalPrice
      );

      res
        .status(statusCode.CREATED)
        .json(successRes("Order created successfully", result));
    } catch (error) {
      next(error);
    }
  }
}

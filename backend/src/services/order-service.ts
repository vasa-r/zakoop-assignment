import Order, { IOrderProduct } from "../models/order-schema";
import { statusCode } from "../types/types";
import { AppError } from "../utils/error";

export class OrderService {
  private static readonly order = Order;

  static async createOrder(
    store: string,
    username: string,
    products: IOrderProduct[],
    totalPrice: number
  ) {
    try {
      const order = await this.order.create({
        store,
        username,
        products,
        totalPrice,
      });

      return order;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while creating order"
      );
    }
  }
}

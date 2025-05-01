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
      const randomDays = Math.floor(Math.random() * 3) + 1;
      const expectedDeliveryDate = new Date();
      expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + randomDays);

      const order = await this.order.create({
        store,
        username,
        products,
        totalPrice,
        expectedDeliveryDate,
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

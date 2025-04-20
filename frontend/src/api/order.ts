import { IOrderProduct } from "../types/types";
import { apiClient } from "./api-client";

export const orderApi = {
  createOrder: async (
    store: string,
    username: string,
    products: IOrderProduct[],
    totalPrice: number
  ) => {
    try {
      const response = await apiClient.post(`/order/create`, {
        store,
        username,
        products,
        totalPrice,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error occurred while checking out ",
      };
    }
  },
};

import { apiClient } from "./api-client";

export const productApi = {
  getProducts: async (storeId: string, page: number = 1) => {
    try {
      const response = await apiClient.get(
        `/product?storeId=${storeId}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error occurred while retrieving products ",
      };
    }
  },
};

import { apiClient } from "./api-client";

export const storeApi = {
  getStores: async () => {
    try {
      const response = await apiClient.get("/store");
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error occurred while retrieving stores ",
      };
    }
  },
};

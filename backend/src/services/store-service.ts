import Store from "../models/store-model";
import { statusCode } from "../types/types";
import { AppError } from "../utils/error";

export class StoreService {
  private static readonly store = Store;

  static async addStore(
    name: string,
    location: string,
    rating: number,
    image: string
  ) {
    try {
      const store = await this.store.create({ name, location, rating, image });
      return store;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while adding store"
      );
    }
  }

  static async getStore() {
    try {
      const stores = await this.store.find().lean();

      if (stores.length === 0) {
        throw new AppError(statusCode.NOT_FOUND, "No stores found");
      }

      return stores;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while getting stores"
      );
    }
  }
}

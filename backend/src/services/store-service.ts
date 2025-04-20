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
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while adding store"
      );
    }
  }
}

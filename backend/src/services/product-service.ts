import Product from "../models/product-model";
import { statusCode } from "../types/types";
import { AppError } from "../utils/error";

export class ProductService {
  private static readonly product = Product;

  static async addProduct(
    name: string,
    price: number,
    quantity: number,
    storeName: string,
    image: string
  ) {
    try {
      const product = await this.product.create({
        name,
        price,
        quantity,
        storeName,
        image,
      });
      return product;
    } catch (error) {
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while adding product"
      );
    }
  }
}

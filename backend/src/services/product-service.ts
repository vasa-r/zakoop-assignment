import Product from "../models/product-model";
import Store from "../models/store-model";
import { statusCode } from "../types/types";
import { AppError } from "../utils/error";

export class ProductService {
  private static readonly product = Product;
  private static readonly store = Store;

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
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while adding product"
      );
    }
  }
  static async getProducts(
    storeName: string,
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const storeDetails = await this.store.findOne({ name: storeName }).lean();

      if (!storeDetails) {
        throw new AppError(statusCode.NOT_FOUND, "No store found");
      }

      const totalProducts = await this.product.countDocuments({ storeName });

      if (totalProducts === 0) {
        return {
          store: storeDetails,
          products: [],
          meta: {
            totalProducts: 0,
            totalPages: 0,
            currentPage: page,
          },
        };
      }

      const totalPages = Math.ceil(totalProducts / limit);
      const skip = (page - 1) * limit;

      const products = await this.product
        .find({ storeName })
        .skip(skip)
        .limit(limit)
        .lean();

      if (products.length === 0) {
        throw new AppError(statusCode.NOT_FOUND, "No Products found");
      }

      return {
        store: storeDetails,
        products,
        meta: {
          totalPages,
          totalProducts,
          currentPage: page,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        statusCode.SERVER_ERROR,
        "Something went wrong while getting products"
      );
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { statusCode } from "../types/types";
import { successRes } from "../utils/response-format";
import { ProductService } from "../services/product-service";

export class ProductController {
  static async addStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, quantity, storeName, image } = req.body;
      const result = await ProductService.addProduct(
        name,
        price,
        quantity,
        storeName,
        image
      );

      res
        .status(statusCode.CREATED)
        .json(successRes("Product added successfully"));
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { StoreService } from "../services/store-service";
import { statusCode } from "../types/types";
import { successRes } from "../utils/response-format";

export class StoreController {
  static async addStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, location, rating, image } = req.body;
      const result = await StoreService.addStore(name, location, rating, image);

      res
        .status(statusCode.CREATED)
        .json(successRes("Store added successfully"));
    } catch (error) {
      next(error);
    }
  }
  static async getStores(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await StoreService.getStore();

      res
        .status(statusCode.CREATED)
        .json(successRes("Stores fetched successfully", result));
    } catch (error) {
      next(error);
    }
  }
}

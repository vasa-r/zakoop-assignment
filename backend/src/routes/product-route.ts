import { Router } from "express";
import { ProductController } from "../controllers/product-controller";

const productRouter = Router();

productRouter.post("/create", ProductController.addStore);
productRouter.get("/", ProductController.getProducts);

export default productRouter;

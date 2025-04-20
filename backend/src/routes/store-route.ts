import { Router } from "express";
import { StoreController } from "../controllers/store-controller";

const storeRouter = Router();

storeRouter.post("/create", StoreController.addStore);
storeRouter.get("/", StoreController.getStores);

export default storeRouter;

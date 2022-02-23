import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
// import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuth } from "../middlewares/ensureAuth";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/cars", ensureAuth, createCarController.handle);

export { carsRoutes };
import { Router } from "express";

import { ensureAuth } from "../middlewares/ensureAuth";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListAvailableCarController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarController();

carsRoutes.post("/cars", ensureAuth, createCarController.handle);
carsRoutes.get("/cars/available", listAvailableCarsController.handle);

export { carsRoutes };
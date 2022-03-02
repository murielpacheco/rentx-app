import { Router } from "express";

import { ensureAuth } from "../middlewares/ensureAuth";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListAvailableCarController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/cars", ensureAuth, createCarController.handle);

carsRoutes.get("/cars/available", listAvailableCarsController.handle);

carsRoutes.post("/cars/specifications/:id", createCarSpecificationController.handle);

export { carsRoutes };
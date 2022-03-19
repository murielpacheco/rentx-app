import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import { ensureAuth } from "../middlewares/ensureAuth";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListAvailableCarController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { UploardCarImagesController } from "@modules/cars/useCases/UploadCarImages/UploardCarImagesController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploardCarImagesController();

const uploadCarImage = multer(uploadConfig);

carsRoutes.post("/cars", ensureAuth, createCarController.handle);

carsRoutes.get("/cars/available", listAvailableCarsController.handle);

carsRoutes.post("/cars/specifications/:id", createCarSpecificationController.handle);

carsRoutes.post("/cars/images/:id", ensureAuth, uploadCarImage.array("images"), uploadCarImagesController.handle);

export { carsRoutes };